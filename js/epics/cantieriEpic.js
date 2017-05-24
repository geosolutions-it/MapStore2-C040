/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Rx = require('rxjs');
// const axios = require('../../MapStore2/web/client/libs/ajax');
const {CLICK_ON_MAP} = require('../../MapStore2/web/client/actions/map');
const axios = require('../../MapStore2/web/client/libs/ajax');

const {addLayer, changeLayerProperties} = require('../../MapStore2/web/client/actions/layers');
const {changeDrawingStatus, END_DRAWING} = require('../../MapStore2/web/client/actions/draw');
const CoordinatesUtils = require('../../MapStore2/web/client/utils/CoordinatesUtils');
const {DELETE_CANTIERI_AREA, RESET_CANTIERI_AREAS, UPDATE_LAVORI_FEATURES, updateLavoriFeatures} = require('../actions/cantieri');
const {getWFSFilterData} = require('../../MapStore2/web/client/epics/wfsquery');
const {indexOf, startsWith, max} = require('lodash');

const getWFSFeatureGenova = (searchUrl, filterObj) => {
    const data = getWFSFilterData(filterObj);
    return Rx.Observable.defer( () =>
        axios.post(searchUrl + '?service=WFS&outputFormat=json&request=getFeature', data, {
          timeout: 60000,
          headers: {'Accept': 'application/json'}
     }));
};

const getCantieriAreaLayer = (store) => {
    let layerState = store.getState().layers;
    let layer = layerState && layerState.flat && layerState.flat.filter(l => l.id === "cantieri_area_layer")[0];
    return layer;
};
const getCantieriLavoriLayer = (store) => {
    let layerState = store.getState().layers;
    let layer = layerState && layerState.flat && layerState.flat.filter(l => l.id === "cantieri_lavori_layer")[0];
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
const updateCantieriAreaFeatures = (features, layer, operation) => {
    let newLayerProps = {};
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
            break;
        }
        default: return Rx.Observable.empty();
    }
    return Rx.Observable.from([
        changeLayerProperties(layer.id, newLayerProps),
        changeDrawingStatus("cleanAndContinueDrawing", "", "LavoriPubblici", [], {}),
        updateLavoriFeatures()
    ]);
};

const createAndAddLayer = (features, store, operation) => {
    features[0].index = 0;
    if (operation === "addAndModify") {
        features[0].id = "area_0";
    }
    let areaOptions = {
        features: features, // TODO reprojectGEOJSON
        group: "Cantieri Areas Layer",
        title: "cantieri_area",
        id: "cantieri_area_layer",
        name: "cantieri_area",
        style: {
            type: "MultiPolygon",
            stroke: {
                color: 'blue',
                width: 2
            },
            fill: {
                color: [0, 0, 0, 0]
            }
        },
        projection: store.getState().map.present.projection
    };
    let lavoriOptions = {
        features: [], // TODO reprojectGEOJSON
        group: "Cantieri Lavori Layer",
        title: "cantieri_lavori",
        id: "cantieri_lavori_layer",
        name: "cantieri_lavori",
        style: {
            "type": "MultiPolygon",
            "stroke": {
                color: 'red',
                width: 2
            },
            "fill": {
                color: [0, 0, 0, 0.2]
            }
        },
        projection: store.getState().map.present.projection
    };
    return Rx.Observable.from([
        addLayer(getLayer(areaOptions)),
        addLayer(getLayer(lavoriOptions)),
        changeDrawingStatus("cleanAndContinueDrawing", "", "LavoriPubblici", [], {}),
        updateLavoriFeatures()
    ]);
};
const getFilterObj = (action, operation, store) => {
    const projection = store.getState().map.present.projection;
    let geometry = {projection};
    let areas = [];
    if (operation === "getAreaGeometryFromClick") {
        geometry.type = "Point";
        let point = [action.point.latlng.lng, action.point.latlng.lat];
        point = CoordinatesUtils.reproject(point, "EPSG:4326", projection);
        geometry.coordinates = [[[point.x, point.y]]];
    } else if (operation === "aggregate") {
        let cantieriAreaLayer = getCantieriAreaLayer(store);
        // take all the coordinates of the areas and create one multipolygon
        areas = cantieriAreaLayer.features.map(f => {
            if (f.geometry.type === "MultiPolygon") {
                return f.geometry.coordinates;
            }
        });
        geometry.type = "MultiPolygon";
        geometry.coordinates = areas;
    }

    return {
        spatialField: {
            operation: "INTERSECTS",
            attribute: "geometry",
            geometry
        },
        "filterType": "OGC",
        "featureTypeName": "topp:states",
        "ogcVersion": "2.0"
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
                return getWFSFeatureGenova(store.getState().cantieri.geoserverUrl, getFilterObj(action, "getAreaGeometryFromClick", store))
                    .switchMap((response) => {
                        if (response.data && response.data.features && response.data.features.length > 0) {
                            let feature = response.data.features[0]; // TODO reprojectGEOJSON
                            let newFeature = CoordinatesUtils.reprojectGeoJson(feature, "EPSG:4326", store.getState().map.present.projection);
                            let layer = getCantieriAreaLayer(store);
                            if (layer !== undefined) {
                                // don't add if already exists
                                if (layer.features.filter(l => l.id === feature.id).length === 0) {
                                    return updateCantieriAreaFeatures([newFeature], layer, "add");
                                }
                            }
                            return createAndAddLayer([newFeature], store, "add");
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
                }
            };
            if (layer !== undefined) {
                return updateCantieriAreaFeatures([feature], layer, "addAndModify");
            }
            return createAndAddLayer([feature], store, "addAndModify");
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
                return updateCantieriAreaFeatures([feature], layer, "delete");
            }
            return Rx.Observable.empty();
        }),
    resetCantieriAreaFeatures: ( action$, store ) =>
        action$.ofType(RESET_CANTIERI_AREAS)
        .switchMap( () => {
            let layer = getCantieriAreaLayer(store);
            if (layer !== undefined) {
                return updateCantieriAreaFeatures(null, layer, "reset");
            }
            return Rx.Observable.empty();
        }),
    updateLavoriFeatures: ( action$, store ) =>
        action$.ofType(UPDATE_LAVORI_FEATURES)
        .switchMap( () => {
            let cantieriLavoriLayer = getCantieriLavoriLayer(store);
            let cantieriAreaLayer = getCantieriLavoriLayer(store);
            if (cantieriLavoriLayer !== undefined && cantieriAreaLayer !== undefined) {
                return getWFSFeatureGenova(store.getState().cantieri.geoserverUrl, getFilterObj(null, "aggregate", store))
                    .switchMap((response) => {
                        if (response.data && response.data.features && response.data.features.length > 0) {
                            return updateCantieriAreaFeatures(response.data.features, cantieriLavoriLayer, "replace");
                        }
                        return Rx.Observable.empty();
                    }).catch(() => {
                        return Rx.Observable.empty();
                    });
            }
            return Rx.Observable.empty();
        })
};
