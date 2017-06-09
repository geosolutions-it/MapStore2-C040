const {changeDrawingStatus} = require('../../MapStore2/web/client/actions/draw');
const {indexOf, max, startsWith, slice} = require('lodash');
const Rx = require('rxjs');
const {
    ELEMENTS_LAYER,
    AREAS_LAYER,
    maxFeaturesExceeded
} = require('../actions/cantieri');
const {changeLayerProperties} = require('../../MapStore2/web/client/actions/layers');
const {info} = require('../../MapStore2/web/client/actions/notifications');

const checkedStyle = {
    type: "Polygon",
    stroke: {
        color: 'blue',
        width: 1
    },
    fill: {
        color: [255, 255, 0, 1]
    }
};

const requestBuilder = require('../../MapStore2/web/client/utils/ogc/WFS/RequestBuilder');
const {filter, and, or, getFeature, property, query} = requestBuilder({wfsVersion: "1.1.0"});

const {elementsLayerSelector, areasLayerSelector} = require('../selector/cantieri');

const getNewIndex = (features) => {
    let indexesOfDrawnAreas = features.filter(f => startsWith(f.id, "area_"));
    if (indexesOfDrawnAreas.length > 0) {
        return max(indexesOfDrawnAreas.map(f => f.index )) + 1;
    }
    return 0;
};

module.exports = {

    featureToRow: (f) => ({
        id: f.properties.ID,
        checked: f.checked,
        name: f.properties.NOME_LIVELLO,
        key: f.properties.NOME_LIVELLO + "." + f.properties.ID
    }),
    isSameFeature: (f, f2) =>
        f.properties.ID === f2.properties.ID
        && f.properties.NOME_LIVELLO === f2.properties.NOME_LIVELLO,
    checkFeature: f =>
        ({
            ...f,
            checked: true,
            style: checkedStyle
        }),
    uncheckFeature: f => ({
            ...f,
            style: undefined,
            checked: false
    }),
    hoverFeature: f => ({
        ...f,
        style: f.checked ?
            {
                ...checkedStyle,
                stroke: {
                    color: "red",
                    width: 3
                }
        } : {
            stroke: {
                color: "red",
                width: 3
            }
        }
    }),
    getCheckedElements: (layer) => {
        // Returns array of array
        return layer.features.filter(f => f.checked).map(f => {
            return [f.properties.ID, f.properties.NOME_LIVELLO ];
        });
    },
    getAreaFilter: (id = 0, typology = "cantiere", areasLayerName) => {
        return {
            filterFields: [{
                attribute: "ID_CANTIERE",
                exception: null,
                operator: "=",
                groupId: 1,
                rowId: "0",
                type: "number",
                value: id
            }, {
                attribute: "TIPOLOGIA",
                exception: null,
                operator: "=",
                groupId: 1,
                rowId: "1",
                type: "string",
                value: typology
            }],
            groupFields: [{
                id: 1,
                index: 0,
                logic: "AND"
            }],
            "filterType": "OGC",
            "featureTypeName": areasLayerName,
            "ogcVersion": "1.1.0"
        };
    },
    getElementsFilter: (checkedElements, elementLayerName) => {
        // return the filter as string
        return getFeature(
            query(
                elementLayerName,
                filter(
                    or(
                        checkedElements.map(el => {
                            return and([property("ID").equalTo(el[0]), property("NOME_LIVELLO").equalTo(el[1])]);
                        })
                    )
                )
            ), {outputFormat: "application/json"}
        );
    },
    isActiveTool: (tool, store) => {
        return store.getState() && store.getState().cantieri && store.getState().cantieri.toolbar && store.getState().cantieri.toolbar.activeTools &&
        indexOf(store.getState().cantieri.toolbar.activeTools, tool) !== -1 || false;
    },
    removeFeature: (idFeature, layer) => {
        const newLayerProps = {features: layer.features.filter(f => f.id !== idFeature)};
        return Rx.Observable.from([changeLayerProperties(layer.id, newLayerProps)]);
    },
    addFeatureToAreaLayer: (feature, layer) => {
        const newIdx = layer.features.length > 0 ? getNewIndex(layer.features) : 0;
        let newLayerProps = {};
        feature.index = newIdx;
        feature.id = "area_" + newIdx;
        newLayerProps.features = layer.features.concat(feature);
        return Rx.Observable.from([
            changeDrawingStatus("cleanAndContinueDrawing", "", "LavoriPubblici", [], {}),
            changeLayerProperties(AREAS_LAYER, newLayerProps)
        ]);
    },
    replaceFeatures: (features, layer) => {
        const newLayerProps = {features: features};
        return Rx.Observable.from([
            changeLayerProperties(layer.id, newLayerProps)
        ]);
    },
    clearAllFeatures: () => {
        const newLayerProps = {features: []};
        return Rx.Observable.from([
            changeLayerProperties(ELEMENTS_LAYER, newLayerProps),
            changeLayerProperties(AREAS_LAYER, newLayerProps)
        ]);
    },
    getAreasLayer: (store) => {
        return areasLayerSelector(store.getState());
    },
    addFeaturesToElementLayer: (elementLayer, areasLayer, newFeatures, totalFeaturesReceived = 0, maxFeatures) => {
        let actions = [];
        let newLayerProps = {features: elementLayer.features.concat(newFeatures)};
        if (totalFeaturesReceived > maxFeatures ) {
            actions.push(maxFeaturesExceeded(true));
            if (areasLayer !== undefined) {
                // removing last drawn areas if it is too big, restoring previous elementLayer features in elementLayer
                newLayerProps.features = elementLayer.features;
                actions.push(changeLayerProperties(areasLayer.id, {features: slice(areasLayer.features, 0, areasLayer.features.length - 1)}));
            }
        }
        actions.push(changeLayerProperties(elementLayer.id, newLayerProps));
        return Rx.Observable.from(actions);
    },
    getElementsLayer: (store) => {
        return elementsLayerSelector(store.getState());
    },
    getAreasGeometry: (features) => {
        return {
            type: "MultiPolygon",
            coordinates: features.map(f => f.geometry.coordinates)
        };
    },
    showQueryElementsError: () => Rx.Observable.of(info({
        title: "warning",
        message: "cantieriGrid.notification.errorQueryElements",
        action: {
            label: "cantieriGrid.notification.confirm"
        },
        autoDismiss: 3,
        position: "tr"
    }))
};
