const Rx = require('rxjs');
const area = require('@turf/area');
const {indexOf, max, startsWith, slice} = require('lodash');
const {changeDrawingStatus} = require('../../MapStore2/web/client/actions/draw');
const {
    ELEMENTS_LAYER,
    AREAS_LAYER,
    maxFeaturesExceeded
} = require('../actions/cantieri');
const {changeLayerProperties} = require('../../MapStore2/web/client/actions/layers');
const {info, error} = require('../../MapStore2/web/client/actions/notifications');

const areaStyle = {
    color: "blue",
    weight: 3,
    fillColor: "#000000",
    fillOpacity: 0
};
const checkedStyle = {
    type: "MultiPolygon",
    color: 'black',
    dashArray: [2],
    weight: 1,
    fillColor: "#FFFF00",
    fillOpacity: 1
};
const unCheckedStyle = {
    type: "MultiPolygon",
    color: 'red',
    weight: 1,
    fillColor: "#C80000",
    fillOpacity: 0.3
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
        style: unCheckedStyle,
        checked: false
    }),
    hoverFeature: f => ({
        ...f,
        style: f.checked ?
            {
                ...checkedStyle,
                color: "red",
                weight: 3
            } : {
                color: "red",
                weight: 3
            }
    }),
    getCheckedElementsFromLayer: (layer) => {
        // Returns array of array
        return layer.features.filter(f => f.checked).map(f => {
            return {"ID_ELEMENTO": f.properties.ID, "TIPOLOGIA": f.properties.NOME_LIVELLO};
        });
    },
    getAreaFilter: (id = 0, typology = "cantiere", areasLayerName) => {
        return getFeature(
            query(
                areasLayerName,
                filter(
                    and([property("ID_CANTIERE").equalTo(id), property("TIPOLOGIA").equalTo(typology)])
                )
            ), {outputFormat: "application/json"}
        );
    },
    getElementsFilter: (checkedElements, elementLayerName) => {
        // return the filter as string
        return getFeature(
            query(
                elementLayerName,
                filter(
                    or(
                        checkedElements.map(el => {
                            return and([property("ID").equalTo(el.ID_ELEMENTO), property("NOME_LIVELLO").equalTo(el.TIPOLOGIA)]);
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
    removeLastFeature: (layer) => {
        const newLayerProps = {features: layer.features.slice(0, layer.features.length - 1 )};
        return Rx.Observable.of(changeLayerProperties(layer.id, newLayerProps));
    },
    addFeatureToAreaLayer: (feature, layer) => {
        const newIdx = layer.features.length > 0 ? getNewIndex(layer.features) : 0;
        let newLayerProps = {};
        feature.index = newIdx;
        feature.id = "area_" + newIdx;
        feature.style = areaStyle;
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
    addFeaturesToElementLayer: (elementLayer, areasLayer, newFeatures, totalFeaturesReceived = 0, maxFeatures, check) => {
        let actions = [];
        let newLayerProps = {features: elementLayer.features.concat(newFeatures)};
        if (totalFeaturesReceived > maxFeatures && check === true) {
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
        const newMultipolygon = features.reduce((p, c) => {
            return p.concat(c.geometry.coordinates);
        }, []);
        return {
            type: "MultiPolygon",
            coordinates: newMultipolygon
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
    })),
    showTimeoutError: () => Rx.Observable.from([error({
        id: "timeout",
        title: "warning",
        message: "cantieriGrid.notification.timeoutError",
        action: {
            label: "cantieriGrid.notification.confirm"
        },
        autoDismiss: 3,
        position: "tc"
    })]),
    getSmallestFeature(features) {
        return features.reduce((candidate, cur) => {
            // get the feature with the smaller area (it is usually the wanted one when you click)
            if (candidate) {
                if (cur.geometry.type === "Polygon" || cur.geometry.type === "MultiPolygon") {
                    // turf miscalculate the area if the coords are not in 4326
                    return area(candidate) > area(cur) ? cur : candidate;
                }
            }
            return cur;
        });
    }
};
