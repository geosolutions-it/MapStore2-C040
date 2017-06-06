/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Rx = require('rxjs');
const area = require('@turf/area');
const {CLICK_ON_MAP} = require('../../MapStore2/web/client/actions/map');
const {ROWS_SELECTED, ROWS_DESELECTED} = require('../actions/cantieri');
const {featureToRow, isSameFeature, checkFeature, uncheckFeature} = require('../utils/CantieriUtils');
const axios = require('../../MapStore2/web/client/libs/ajax');
const {addLayer, changeLayerProperties} = require('../../MapStore2/web/client/actions/layers');
const {changeDrawingStatus, END_DRAWING} = require('../../MapStore2/web/client/actions/draw');

const {reprojectGeoJson} = require('../../MapStore2/web/client/utils/CoordinatesUtils');
const {
    LOAD_CANTIERI_AREA_FEATURES,
    DELETE_CANTIERI_AREA,
    RESET_CANTIERI_AREAS,
    QUERY_ELEMENTS_FEATURES,
    ELEMENTS_LAYER,
    AREAS_LAYER,
    queryElements,
    maxFeaturesExceeded
} = require('../actions/cantieri');

const {getWFSFilterData} = require('../../MapStore2/web/client/epics/wfsquery');
const {indexOf, startsWith, max, slice} = require('lodash');

const getWFSFeature = (searchUrl, filterObj) => {
    const data = getWFSFilterData(filterObj);
    return Rx.Observable.defer( () =>
        axios.post(searchUrl + '?service=WFS&outputFormat=json&request=getFeature', data, {
          timeout: 10000,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/xml'}
     }));
};

const getAreasLayer = (store) => {
    let layerState = store.getState().layers;
    let layer = layerState && layerState.flat && layerState.flat.filter(l => l.id === AREAS_LAYER)[0];
    return layer;
};
const getElementsLayer = (store) => {
    let layerState = store.getState().layers;
    let layer = layerState && layerState.flat && layerState.flat.filter(l => l.id === ELEMENTS_LAYER)[0];
    return layer;
};
const getLayer = (props) => {
    return {
        "group": props.group,
        "name": props.name,
        "id": props.id,
        "title": props.title,
        "type": "vector",
        "features": props.features,
        "visibility": true,
        "crs": props.projection,
        "featuresCrs": props.projection,
        "style": props.style
    };
};

const getNewIndex = (features) => {
    let indexesOfDrawnAreas = features.filter(f => startsWith(f.id, "area_"));
    if (indexesOfDrawnAreas.length > 0) {
        return max(indexesOfDrawnAreas.map(f => f.index )) + 1;
    }
    return 0;
};
const updateAreaFeatures = (features, layer, operation, store, totalFeatures) => {
    let newLayerProps = {};
    let actions = [];
    switch (operation) {
        case "delete": {
            newLayerProps.features = layer.features.filter(f => f.id !== features[0].id);
            break;
        }
        case "addAndModify": {
            const newIdx = layer.features.length > 0 ? getNewIndex(layer.features) : 0;
            features[0].index = newIdx;
            features[0].id = "area_" + newIdx;
            newLayerProps.features = layer.features.concat(features[0]);
            actions.push(changeDrawingStatus("cleanAndContinueDrawing", "", "LavoriPubblici", [], {}));
            break;
        }
        case "add": {
            features.index = 0;
            newLayerProps.features = layer.features.concat(features);
            break;
        }
        case "replace": {
            features.index = 0;
            newLayerProps.features = features;
            break;
        }
        case "reset": {
            newLayerProps.features = [];
            actions.push(changeLayerProperties(ELEMENTS_LAYER, newLayerProps));
            break;
        }
        default: return Rx.Observable.empty();
    }
    if (totalFeatures > store.getState().cantieri.maxFeatures ) {
        actions.push(maxFeaturesExceeded(true));
        let areaLayer = getAreasLayer(store);
        if (areaLayer !== undefined) {
            // removing last drawn areas if it too big, restoring previous layer features in elementLayer
            newLayerProps.features = layer.features;
            actions.push(changeLayerProperties(areaLayer.id, {features: slice(areaLayer.features, 0, areaLayer.features.length - 1)}));
        }
    }
    actions.push(changeLayerProperties(layer.id, newLayerProps));
    return Rx.Observable.from(actions);
};

const createAndAddLayers = (features, store) => {
    let actions = [];
    let areaOptions = {
        features: features,
        group: "Cantiere",
        title: "Aree",
        id: AREAS_LAYER,
        name: "cantieri_area",
        style: {
            type: "MultiPolygon",
            stroke: {
                color: 'blue',
                width: 3
            },
            fill: {
                color: [0, 0, 0, 0]
            }
        },
        projection: store.getState().map.present.projection
    };

    let elementiOptions = {
        features: [],
        group: "Cantiere",
        title: "Elementi Selezionati",
        id: ELEMENTS_LAYER,
        name: "cantiere_elements",
        style: {
            "type": "MultiPolygon",
            "stroke": {
                color: 'red',
                width: 1
            },
            "fill": {
                color: [100, 100, 100, 0.1]
            }
        },
        projection: store.getState().map.present.projection
    };
    actions.push(addLayer(getLayer(elementiOptions)));
    actions.push(addLayer(getLayer(areaOptions)));
    // actions.push(queryElements()); TODO create a filter from the areas to pass to query elements
    actions.push(changeDrawingStatus("cleanAndContinueDrawing", "", "LavoriPubblici", [], {}));
    return Rx.Observable.from(actions);
};
const getSpatialFilter = (geometry, options, operation = "INTERSECTS") => {
    return {
        spatialField: {
            operation: operation,
            attribute: "GEOMETRY",
            geometry
        },
        "filterType": "OGC",
        "featureTypeName": "CORSO_1:V_ELEMENTI_CANTIERI",
        "ogcVersion": "1.1.0",
        ...options
    };
};

const isActiveTool = (tool, store) => {
    return store.getState() && store.getState().cantieri && store.getState().cantieri.toolbar && store.getState().cantieri.toolbar.activeTools &&
    indexOf(store.getState().cantieri.toolbar.activeTools, tool) !== -1 || false;
};

module.exports = {
    updateCantieriByClick: ( action$, store ) =>
        action$.ofType(CLICK_ON_MAP)
            .filter(() => isActiveTool("pointSelection", store))
            .switchMap( (action) => {
                const geometry = {
                    type: "Point",
                    coordinates: [action.point.latlng.lng, action.point.latlng.lat]
                };
                return getWFSFeature(store.getState().cantieri.geoserverUrl, getSpatialFilter(geometry))
                    .switchMap((response) => {
                        if (response.data && response.data.features) {
                            const elementsLayer = getElementsLayer(store);
                            let featureByClick = response.data.features
                                .filter(f => elementsLayer.features.findIndex(f2 => isSameFeature(f, f2)) < 0);
                            if (elementsLayer !== undefined && featureByClick.length > 0) {
                                featureByClick = featureByClick.reduce((candidate, cur) => {
                                    // get the feature with the smaller area (it is usually the wanted one when you click)
                                    if (candidate) {
                                        if (cur.geometry.type === "Polygon" || cur.geometry.type === "MultiPolygon") {
                                            // turf miscalculate the area if the coords are not in 4326
                                            return area(candidate) > area(cur) ? cur : candidate;
                                        }
                                    }
                                    return cur;
                                });
                                featureByClick = reprojectGeoJson(featureByClick, "EPSG:4326", store.getState().map.present.projection);
                                let layerFeatures = elementsLayer.features.filter(f => f.id !== featureByClick.id);
                                return updateAreaFeatures(layerFeatures.concat(
                                    [featureByClick].map(checkFeature)
                                ), elementsLayer, "replace", store, response.data.totalFeatures);
                            }
                        }
                        return Rx.Observable.empty();
                    });
            }),
    updateCantieriAreaLayer: ( action$, store ) =>
        action$.ofType(END_DRAWING)
        .filter((action) => action.owner === "LavoriPubblici")
        .switchMap( (action) => {
            let layer = getAreasLayer(store);
            let feature = {
                type: "Feature",
                geometry: {
                    coordinates: [action.geometry.coordinates],
                    type: "MultiPolygon"
                },
                id: "area_0",
                index: 0
            };
            const options = {
                pagination: {
                    maxFeatures: store.getState().cantieri.maxFeatures
                }
            };
            const f4326 = reprojectGeoJson(feature, store.getState().map.present.projection, "EPSG:4326");
            const filter = getSpatialFilter(f4326.geometry, options, "WITHIN");
            if (layer !== undefined) {
                return updateAreaFeatures([feature], layer, "addAndModify", store, 0).concat(Rx.Observable.of(queryElements(filter)));
            }

            return createAndAddLayers([feature], store);
        }),
    deleteCantieriAreaFeature: ( action$, store ) =>
        action$.ofType(DELETE_CANTIERI_AREA)
        .switchMap( (action) => {
            let layer = getAreasLayer(store);
            let feature = {
                type: "Feature",
                geometry: {},
                id: action.area
            };
            if (layer !== undefined) {
                return updateAreaFeatures([feature], layer, "delete", store, 0);
            }
            return Rx.Observable.empty();
        }),
    resetCantieriAreaFeatures: ( action$, store ) =>
        action$.ofType(RESET_CANTIERI_AREAS)
        .switchMap( () => {
            let layer = getAreasLayer(store);
            if (layer !== undefined) {
                return updateAreaFeatures([], layer, "reset", store, 0);
            }
            return Rx.Observable.empty();
        }),
    updateCantieriElementsFeatures: ( action$, store ) =>
        action$.ofType(QUERY_ELEMENTS_FEATURES)
        .switchMap( (action) => {
            let elementsLayer = getElementsLayer(store);
            if (elementsLayer !== undefined) {
                return getWFSFeature(store.getState().cantieri.geoserverUrl, action.filter)
                    .switchMap((response) => {
                        if (response.data && response.data.features && response.data.features.length > 0) {
                            let newFeatures = response.data.features.map(f => {
                                return reprojectGeoJson(f, "EPSG:4326", store.getState().map.present.projection);
                            }).filter(f => elementsLayer.features.findIndex(f2 => isSameFeature(f, f2)) < 0);
                            return updateAreaFeatures(newFeatures.map(checkFeature), elementsLayer, "add", store, response.data.totalFeatures);
                        }
                        return Rx.Observable.empty();
                    });
            }
            return Rx.Observable.empty();
        }),
    fetchCantieriAreaFeatures: ( action$, store ) =>
        action$.ofType(LOAD_CANTIERI_AREA_FEATURES)
            .switchMap( (action) => {
                let newFeatures = action.areaFeatures.map(f => {
                    return reprojectGeoJson(f, "EPSG:4326", store.getState().map.present.projection);
                });
                return createAndAddLayers(newFeatures, store);
            }),
    updateCantieriElementsStyle: ( action$, store ) =>
        action$.ofType(ROWS_SELECTED, ROWS_DESELECTED).switchMap( action => {
            {
                const modifyFeatures = (f) => {
                    const rowIndex = action.rows.findIndex(r => r.row.key === featureToRow(f).key);
                    if (rowIndex >= 0) {
                        if ( action.type === ROWS_SELECTED) {
                            return checkFeature(f);
                        }
                        return uncheckFeature(f);

                    }
                    return f;
                };
                const layer = getElementsLayer(store);
                let features = layer.features.map(modifyFeatures);

                return Rx.Observable.of(changeLayerProperties(layer.id, {features}));
            }
        })

            /*,
    initCantieriPluginEpic: ( action$ ) =>
        action$.ofType(MAP_CONFIG_LOADED)
            .switchMap( () => {
                return Rx.Observable.of(loadCantieriAreaFeatures());
        })*/
};
