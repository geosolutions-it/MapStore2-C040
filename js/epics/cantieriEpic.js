/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Rx = require('rxjs');
const {CLICK_ON_MAP} = require('../../MapStore2/web/client/actions/map');
const axios = require('../../MapStore2/web/client/libs/ajax');
const {addLayer, changeLayerProperties} = require('../../MapStore2/web/client/actions/layers');
const {changeDrawingStatus, END_DRAWING} = require('../../MapStore2/web/client/actions/draw');
const {MAP_CONFIG_LOADED} = require('../../MapStore2/web/client/actions/config');
const CoordinatesUtils = require('../../MapStore2/web/client/utils/CoordinatesUtils');
const {LOAD_CANTIERI_AREA_FEATURES, DELETE_CANTIERI_AREA, RESET_CANTIERI_AREAS, UPDATE_ELEMENTI_FEATURES, updateElementiFeatures,
     loadCantieriAreaFeatures, loadCheckedElementi, maxFeaturesExceeded} = require('../actions/cantieri');
const {getWFSFilterData} = require('../../MapStore2/web/client/epics/wfsquery');
const {indexOf, startsWith, max, find} = require('lodash');

const getWFSFeature = (searchUrl, filterObj) => {
    const data = getWFSFilterData(filterObj);
    return Rx.Observable.defer( () =>
        axios.post(searchUrl + '?service=WFS&outputFormat=json&request=getFeature', data, {
          timeout: 60000,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/xml'}
     }));
};

const getCantieriAreaLayer = (store) => {
    let layerState = store.getState().layers;
    let layer = layerState && layerState.flat && layerState.flat.filter(l => l.id === "cantieri_area_layer")[0];
    return layer;
};
const getCantieriElementiLayer = (store) => {
    let layerState = store.getState().layers;
    let layer = layerState && layerState.flat && layerState.flat.filter(l => l.id === "cantieri_elementi_layer")[0];
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
        "style": props.style,
        "overrideOLStyle": true
    };
};

const getNewIndex = (features) => {
    let indexesOfDrawnAreas = features.filter(f => startsWith(f.id, "area_"));
    if (indexesOfDrawnAreas.length > 0) {
        return max(indexesOfDrawnAreas.map(f => f.index )) + 1;
    }
    return 0;
};
const updateCantieriAreaFeatures = (features, layer, operation, store) => {
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
            actions.push(loadCheckedElementi([]));
            actions.push(changeLayerProperties("cantieri_elementi_layer", newLayerProps));
            break;
        }
        default: return Rx.Observable.empty();
    }
    actions.push(changeLayerProperties(layer.id, newLayerProps));
    if (layer.id !== "cantieri_elementi_layer") {
        actions.push(updateElementiFeatures());
    }
    if (features.length === store.getState().cantieri.maxFeatures ) {
        actions.push(maxFeaturesExceeded(true));
    } else {
        actions.push(maxFeaturesExceeded(false));
    }

    return Rx.Observable.from(actions);
};

const createAndAddLayers = (features, store, checkedElementi) => {
    let actions = [];
    let areaOptions = {
        features: features,
        group: "Cantieri Areas Layer",
        title: "cantieri_area",
        id: "cantieri_area_layer",
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
        group: "Cantieri Elementi Layer",
        title: "cantieri_elementi",
        id: "cantieri_elementi_layer",
        name: "cantieri_elementi",
        style: {
            "type": "MultiPolygon",
            "stroke": {
                color: 'red',
                width: 1
            },
            "fill": {
                color: [255, 0, 0, 0.5]
            }
        },
        projection: store.getState().map.present.projection
    };
    actions.push(addLayer(getLayer(elementiOptions)));
    actions.push(addLayer(getLayer(areaOptions)));
    actions.push(updateElementiFeatures());
    actions.push(changeDrawingStatus("cleanAndContinueDrawing", "", "LavoriPubblici", [], {}));
    if (checkedElementi) {
        actions.push(loadCheckedElementi(checkedElementi));
    }
    return Rx.Observable.from(actions);
};
const getFilterObj = (action, operation, store) => {
    const projection = store.getState().map.present.projection;
    let geometry = {projection};
    let areas = [];
    if (operation === "getAreaGeometryFromClick") {
        geometry.type = "Point";
        let point = [action.point.latlng.lng, action.point.latlng.lat];
        point = CoordinatesUtils.reproject(point, "EPSG:4326", projection);
        geometry.coordinates = [[[point.x, point.y]]]; // TODO FIX THIS AND FILTER UTILS AND TESTS
    } else if (operation === "aggregate") {
        let cantieriAreaLayer = getCantieriAreaLayer(store);
        // take all the coordinates of the areas and create one multipolygon
        areas = cantieriAreaLayer.features.map(f => f.geometry.coordinates[0]);
        geometry.type = "MultiPolygon";
        geometry.coordinates = areas;
    }

    return {
        spatialField: {
            operation: "INTERSECTS",
            attribute: "GEOMETRY",
            geometry
        },
        "filterType": "OGC",
        "featureTypeName": "CORSO_1:V_TEST_CANTIERI",
        "ogcVersion": "1.1.0",
        pagination: {
            maxFeatures: operation === "aggregate" ? store.getState().cantieri.maxFeatures : null
        }
    };
};

const isActiveTool = (tool, store) => {
    return store.getState() && store.getState().cantieri && store.getState().cantieri.toolbar && store.getState().cantieri.toolbar.activeTools &&
    indexOf(store.getState().cantieri.toolbar.activeTools, tool) !== -1 || false;
};

module.exports = {
    addOrUpdateCantieriAreaLayerByClick: ( action$, store ) =>
        action$.ofType(CLICK_ON_MAP)
            .filter(() => isActiveTool("pointSelection", store))
            .switchMap( (action) => {
                return getWFSFeature(store.getState().cantieri.geoserverUrl, getFilterObj(action, "getAreaGeometryFromClick", store))
                    .switchMap((response) => {
                        if (response.data && response.data.features && response.data.features.length > 0) {
                            let featuresByClick = response.data.features.map(f => CoordinatesUtils.reprojectGeoJson(f, "EPSG:4326",
                                store.getState().map.present.projection));
                            let areaLayer = getCantieriAreaLayer(store);
                            if (areaLayer !== undefined) {
                                let layerFeaturesIds = areaLayer.features.map(f => f.id);

                                // find new features
                                let featuresToAdd = featuresByClick.filter(f => indexOf(layerFeaturesIds, f.id) === -1);
                                // find existant features
                                let featuresToUpdate = featuresByClick.filter(f => indexOf(layerFeaturesIds, f.id) !== -1);
                                let featuresToUpdateIds = featuresToUpdate.map(f => f.id);

                                let layerFeatures = areaLayer.features.map(f => {
                                    return featuresToUpdateIds.length > 0 ? find(featuresToUpdate, (el) => el.id === f.id) : f;
                                });

                                return updateCantieriAreaFeatures(layerFeatures.concat(featuresToAdd), areaLayer, "replace", store);
                            }
                            return createAndAddLayers(featuresByClick, store, null);
                        }
                        return Rx.Observable.empty();
                    })
                    .catch(() => {
                        return Rx.Observable.empty();
                    });
            }).catch(() => {
                return Rx.Observable.empty();
            }),
    addOrUpdateCantieriAreaLayer: ( action$, store ) =>
        action$.ofType(END_DRAWING)
        .filter((action) => action.owner === "LavoriPubblici")
        .switchMap( (action) => {
            let layer = getCantieriAreaLayer(store);
            let feature = {
                type: "Feature",
                geometry: {
                    coordinates: [action.geometry.coordinates],
                    type: "MultiPolygon"
                },
                id: "area_0",
                index: 0
            };
            if (layer !== undefined) {
                return updateCantieriAreaFeatures([feature], layer, "addAndModify", store);
            }
            return createAndAddLayers([feature], store, null);
        }),
    deleteCantieriAreaFeature: ( action$, store ) =>
        action$.ofType(DELETE_CANTIERI_AREA)
        .switchMap( (action) => {
            let layer = getCantieriAreaLayer(store);
            let feature = {
                type: "Feature",
                geometry: {},
                id: action.area
            };
            if (layer !== undefined) {
                return updateCantieriAreaFeatures([feature], layer, "delete", store);
            }
            return Rx.Observable.empty();
        }),
    resetCantieriAreaFeatures: ( action$, store ) =>
        action$.ofType(RESET_CANTIERI_AREAS)
        .switchMap( () => {
            let layer = getCantieriAreaLayer(store);
            if (layer !== undefined) {
                return updateCantieriAreaFeatures([], layer, "reset", store);
            }
            return Rx.Observable.empty();
        }),
    updateElementiFeaturesEpic: ( action$, store ) =>
        action$.ofType(UPDATE_ELEMENTI_FEATURES)
        .switchMap( () => {
            let cantieriElementiLayer = getCantieriElementiLayer(store);
            let cantieriAreaLayer = getCantieriAreaLayer(store);
            if (cantieriElementiLayer !== undefined && cantieriAreaLayer !== undefined) {
                return getWFSFeature(store.getState().cantieri.geoserverUrl, getFilterObj(null, "aggregate", store))
                    .switchMap((response) => {
                        if (response.data && response.data.features && response.data.features.length > 0) {
                            let newFeatures = response.data.features.map(f => {
                                return CoordinatesUtils.reprojectGeoJson(f, "EPSG:4326", store.getState().map.present.projection);
                            });
                            return updateCantieriAreaFeatures(newFeatures, cantieriElementiLayer, "replace", store);
                        }
                        return updateCantieriAreaFeatures([], cantieriElementiLayer, "reset", store);
                    }).catch(() => {
                        return Rx.Observable.empty();
                    });
            }
            return Rx.Observable.empty();
        }),
    loadCantieriAreaFeaturesEpic: ( action$, store ) =>
        action$.ofType(LOAD_CANTIERI_AREA_FEATURES)
            .switchMap( (action) => {
                let newFeatures = action.areaFeatures.map(f => {
                    return CoordinatesUtils.reprojectGeoJson(f, "EPSG:4326", store.getState().map.present.projection);
                });
                return createAndAddLayers(newFeatures, store, action.checkedElementi);
            }),
    initCantieriPluginEpic: ( action$ ) =>
        action$.ofType(MAP_CONFIG_LOADED)
            .switchMap( () => {
                return Rx.Observable.of(loadCantieriAreaFeatures());
            })
};
