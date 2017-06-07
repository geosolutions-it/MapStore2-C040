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

const {processOGCSimpleFilterField} = require('../../MapStore2/web/client/utils/FilterUtils');
const {filter} = require('../../MapStore2/web/client/utils/ogc/Filter/base');
const {error} = require('../../MapStore2/web/client/actions/notifications');
const {featureToRow, isSameFeature, checkFeature, uncheckFeature, getAreaFilter, isActiveTool,
    getNewIndex, removeFeature, clearAllFeatures, getAreasLayer, getElementsLayer, getAreasGeometry,
    addFeaturesToElementLayer, showQueryElementsError} = require('../utils/CantieriUtils');
const axios = require('../../MapStore2/web/client/libs/ajax');
const {addLayer, changeLayerProperties} = require('../../MapStore2/web/client/actions/layers');
const {changeDrawingStatus, END_DRAWING} = require('../../MapStore2/web/client/actions/draw');

const {reprojectGeoJson} = require('../../MapStore2/web/client/utils/CoordinatesUtils');
const {
    ERROR_LOAD_CANTIERI_AREAS,
    ERROR_RESET_CANTIERI_FEATURES,
    ERROR_REMOVE_CANTIERI_AREA,
    LOAD_CANTIERI_AREA_FEATURES,
    REMOVE_CANTIERI_AREA,
    RESET_CANTIERI_FEATURES,
    QUERY_ELEMENTS_FEATURES,
    ELEMENTS_LAYER,
    AREAS_LAYER,
    ROWS_SELECTED,
    ROWS_DESELECTED,
    SAVE_CANTIERI_DATA,
    dataSaved,
    savingError,
    queryElements
} = require('../actions/cantieri');

const {getWFSFilterData} = require('../../MapStore2/web/client/epics/wfsquery');
const {transaction, describeFeatureType} = require('../api/WFST');
const {getTypeName} = require('../../MapStore2/web/client/utils/ogc/WFS/base');
const {insert, deleteFeaturesByFilter} = require('../../MapStore2/web/client/utils/ogc/WFST');

const getWFSFeature = (searchUrl, filterObj) => {
    const data = getWFSFilterData(filterObj);
    return Rx.Observable.defer( () =>
        axios.post(searchUrl + '?service=WFS&outputFormat=json&request=getFeature', data, {
          timeout: 10000,
          headers: {'Accept': 'application/json', 'Content-Type': 'application/xml'}
     }));
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

const updateAreaFeatures = (features, layer, operation) => {
    let newLayerProps = {};
    let actions = [];
    switch (operation) {
        case "addAndModify": {
            const newIdx = layer.features.length > 0 ? getNewIndex(layer.features) : 0;
            features[0].index = newIdx;
            features[0].id = "area_" + newIdx;
            newLayerProps.features = layer.features.concat(features[0]);
            actions.push(changeDrawingStatus("cleanAndContinueDrawing", "", "LavoriPubblici", [], {}));
            break;
        }
        case "replace": {
            features.index = 0;
            newLayerProps.features = features;
            break;
        }
        default: return Rx.Observable.empty();  // TODO provide a proper error message to visualize it in notification
    }
    actions.push(changeLayerProperties(layer.id, newLayerProps));
    return Rx.Observable.from(actions);
};
var areaCount = 0;
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

const createAndAddLayers = (features, store) => {
    let actions = [];
    let areaOptions = {
        features: features,
        group: "Cantiere",
        title: "Aree",
        id: AREAS_LAYER,
        name: "CORSO_1:AREE_CANTIERE",
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

    const options = {
        pagination: {
            maxFeatures: store.getState().cantieri.maxFeatures
        }
    };
    let areasGeometry = reprojectGeoJson(getAreasGeometry(features), store.getState().map.present.projection);
    actions.push(queryElements(getSpatialFilter(areasGeometry, options, "WITHIN")));
    actions.push(changeDrawingStatus("cleanAndContinueDrawing", "", "LavoriPubblici", [], {}));
    return Rx.Observable.from(actions);
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
                                ), elementsLayer, "replace", store, 0);
                            }
                        }
                        return Rx.Observable.empty(); // TODO provide a proper error message to visualize it in notification
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
                    coordinates: action.geometry.coordinates,
                    type: "Polygon"
                },
                id: "area_0",
                geometry_name: /* selectGeometryName(state) || */"GEOMETRY",
                properties: {
                    "ID_ELEMENTO": areaCount++,
                    "ID_CANTIERE": /* selectCantiereId(state) || */0,
                    "TIPOLOGIA": /*  selectTipologia(state) || */"cantiere"
                },
                index: 0
            };
            const options = {
                pagination: {
                    maxFeatures: store.getState().cantieri.maxFeatures
                }
            };
            const f4326 = reprojectGeoJson(feature, store.getState().map.present.projection, "EPSG:4326");
            const f = getSpatialFilter(f4326.geometry, options, "WITHIN");
            if (layer !== undefined) {
                return updateAreaFeatures([feature], layer, "addAndModify", store, 0).concat(Rx.Observable.of(queryElements(f)));
            }

            return createAndAddLayers([feature], store);
        }),
    deleteCantieriAreaFeature: ( action$, store ) =>
        action$.ofType(REMOVE_CANTIERI_AREA)
        .switchMap( (action) => {
            let areasLayer = getAreasLayer(store);
            if (areasLayer !== undefined) {
                return removeFeature(action.area, areasLayer);
            }
            return Rx.Observable.of(error({
                uid: ERROR_REMOVE_CANTIERI_AREA,
                title: "warning",
                message: "cantieriGrid.notification.removeFeatureError",
                action: {
                    label: "cantieriGrid.notification.confirm"
                },
                autoDismiss: 0,
                position: "tr"
            }));
        }),
    resetCantieriFeatures: ( action$, store ) =>
        action$.ofType(RESET_CANTIERI_FEATURES)
        .switchMap( () => {
            let areasLayer = getAreasLayer(store);
            let elementsLayer = getAreasLayer(store);
            if (areasLayer !== undefined && elementsLayer !== undefined) {
                return clearAllFeatures();
            }
            return Rx.Observable.of(error({
                uid: ERROR_RESET_CANTIERI_FEATURES,
                title: "warning",
                message: "cantieriGrid.notification.resetCantieriFeaturesError",
                action: {
                    label: "cantieriGrid.notification.confirm"
                },
                autoDismiss: 0,
                position: "tr"
            }));
        }),
    updateCantieriElementsFeatures: ( action$, store ) =>
        action$.ofType(QUERY_ELEMENTS_FEATURES)
        .switchMap( (action) => {
            let elementsLayer = getElementsLayer(store);
            let areasLayer = getAreasLayer(store);
            if (elementsLayer !== undefined && areasLayer !== undefined) {
                return getWFSFeature(store.getState().cantieri.geoserverUrl, action.filter)
                    .switchMap((response) => {
                        if (response.data && response.data.features && response.data.features.length > 0) {
                            let newFeatures = response.data.features.map(f => {
                                return reprojectGeoJson(f, "EPSG:4326", store.getState().map.present.projection);
                            }).filter(f => elementsLayer.features.findIndex(f2 => isSameFeature(f, f2)) < 0);
                            return addFeaturesToElementLayer(
                                elementsLayer,
                                areasLayer,
                                newFeatures.map(checkFeature),
                                response.data.totalFeatures,
                                store.getState().cantieri.maxFeatures);
                        }
                        return showQueryElementsError();
                    });
            }
            return showQueryElementsError();
        }),
    fetchCantieriAreaFeatures: ( action$, store ) =>
        action$.ofType(LOAD_CANTIERI_AREA_FEATURES)
            .switchMap( () => {
                const cantieriState = store.getState().cantieri;
                return getWFSFeature(cantieriState.geoserverUrl, getAreaFilter(cantieriState.id, cantieriState.typology))
                    .switchMap((response) => {
                        if (response.data && response.data.features && response.data.features.length > 0) {
                            let newFeatures = response.data.features.map(f => {
                                return reprojectGeoJson(f, "EPSG:4326", store.getState().map.present.projection);
                            });
                            return createAndAddLayers(newFeatures, store);// TODO GET FROM STORE the checked elements
                        }
                        if (response.data.features.length === 0) {
                            return Rx.Observable.empty();
                        }
                        return Rx.Observable.of(error({
                            uid: ERROR_LOAD_CANTIERI_AREAS,
                            title: "warning",
                            message: "cantieriGrid.notification.errorLoadCantieriAreas",
                            action: {
                                label: "cantieriGrid.notification.confirm"
                            },
                            autoDismiss: 0,
                            position: "tr"
                        }));
                    });
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
        }),
        saveCantieriAreas: (action$, store) =>
            action$.ofType(SAVE_CANTIERI_DATA)
                .throttleTime(2000)
                .switchMap( (action) =>
                    Rx.Observable.defer( () => describeFeatureType(store.getState().cantieri.geoserverUrl, getAreasLayer(store).name ) )
                        .switchMap(describe => transaction(store.getState().cantieri.geoserverUrl,
                                [
                                    // SOME PROBLEM ON SERVER SIDE DO NOT ALLOW TO SAVE
                                    deleteFeaturesByFilter(
                                        filter(processOGCSimpleFilterField({attribute: "ID_CANTIERE", type: "number", operator: "=", values: "1"}, "ogc")),
                                        getTypeName(describe)
                                    ),
                                    // */
                                    insert(reprojectGeoJson({type: "FeatureCollection", features: getAreasLayer(store).features}, store.getState().map.present.projection, "EPSG:4326"), describe)
                                ],
                                describe
                            ))
                        .map(() => dataSaved(action.checkedElements))
                        .catch( (e) => Rx.Observable.of(savingError(e)))
                    )
};
