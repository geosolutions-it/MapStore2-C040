/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ROWS_SELECTED = "ROWS_SELECTED";
const ROWS_DESELECTED = "ROWS_DESELECTED";
const INIT_ELEMENTI_PUBBLICI_PLUGIN = "INIT_ELEMENTI_PUBBLICI_PLUGIN";
const SET_ACTIVE_GRID = "SET_ACTIVE_GRID";
const DELETE_CANTIERI_AREA = "DELETE_CANTIERI_AREA";
const SET_ACTIVE_DRAW_TOOL = "SET_ACTIVE_DRAW_TOOL";
const RESET_CANTIERI_AREAS = "RESET_CANTIERI_AREAS";
const UPDATE_ELEMENTI_FEATURES = "UPDATE_ELEMENTI_FEATURES";
const LOAD_CANTIERI_AREA_FEATURES = "LOAD_CANTIERI_AREA_FEATURES";
const LOAD_CHECKED_ELEMENTI = "LOAD_CHECKED_ELEMENTI";
const SAVE_CANTIERI_DATA = "SAVE_CANTIERI_DATA";
const MAX_FEATURES_EXCEEDED = "MAX_FEATURES_EXCEEDED";

/**
 * updates in the state the selected rows
 * @memberof actions.cantieri
 * @return {action} of type `ROWS_SELECTED`
 */
function rowsSelected(rows) {
    return {
        type: ROWS_SELECTED,
        rows
    };
}
/**
 * updates in the state the selected rows
 * @memberof actions.cantieri
 * @return {action} of type `ROWS_DESELECTED`
 */
function rowsDeselected(rows) {
    return {
        type: ROWS_DESELECTED,
        rows
    };
}
/**
 * initialize the plugin (should be called on componentDidMount)
 * @memberof actions.cantieri
 * @return {action} of type `INIT_ELEMENTI_PUBBLICI_PLUGIN`
 */
function initPlugin(options) {
    return {
        type: INIT_ELEMENTI_PUBBLICI_PLUGIN,
        options
    };
}
/**
 * udpates the active grid
 * @memberof actions.cantieri
 * @return {action} of type `SET_ACTIVE_GRID`
 */
function setActiveGrid(activeGrid) {
    return {
        type: SET_ACTIVE_GRID,
        activeGrid
    };
}
/**
 * delete a row in the areas grid
 * @memberof actions.cantieri
 * @return {action} of type `DELETE_CANTIERI_AREA`
 */
function deleteCantieriArea(area) {
    return {
        type: DELETE_CANTIERI_AREA,
        area
    };
}
/**
 * clear all areas
 * @memberof actions.cantieri
 * @return {action} of type `RESET_CANTIERI_AREAS`
 */
function resetCantieriAreas() {
    return {
        type: RESET_CANTIERI_AREAS
    };
}
/**
 * update elementi features
 * @memberof actions.cantieri
 * @return {action} of type `UPDATE_ELEMENTI_FEATURES`
 */
function updateElementiFeatures() {
    return {
        type: UPDATE_ELEMENTI_FEATURES
    };
}
/**
 * set the active draw tool
 * @memberof actions.cantieri
 * @return {action} of type `SET_ACTIVE_DRAW_TOOL`
 */
function setActiveDrawTool(activeDrawTool) {
    return {
        type: SET_ACTIVE_DRAW_TOOL,
        activeDrawTool
    };
}
/**
 * load checked elementi
 * @memberof actions.cantieri
 * @return {action} of type `LOAD_CHECKED_ELEMENTI`
 */
function loadCheckedElementi(checkedElementi) {
    return {
        type: LOAD_CHECKED_ELEMENTI,
        checkedElementi
    };
}
/**
 * save data
 * @memberof actions.cantieri
 * @return {action} of type `SAVE_CANTIERI_DATA`
 */
function saveCantieriData(checkedElementi, areaFeatures) {
    return {
        type: SAVE_CANTIERI_DATA,
        checkedElementi,
        areaFeatures
    };
}
/**
 * set up an error for the max features exceeded
 * @memberof actions.cantieri
 * @return {action} of type `MAX_FEATURES_EXCEEDED`
 */
function maxFeaturesExceeded(status) {
    return {
        type: MAX_FEATURES_EXCEEDED,
        status
    };
}
/**
 * load area features
 * @memberof actions.cantieri
 * @return {action} of type `LOAD_CANTIERI_AREA_FEATURES`
 */
function loadCantieriAreaFeatures() {
    const checkedElementi = ["14141"];
    let myFeatures = [{"type": "Feature", "id": "area_0", "geometry": {"type": "MultiPolygon", "coordinates": [[[[-104.053108, 41.698246], [-104.054993, 41.564247], [-104.053505, 41.388107], [-104.051201, 41.003227], [-104.933968, 40.994305], [-105.278259, 40.996365], [-106.202896, 41.000111], [-106.328545, 41.001316], [-106.864838, 40.998489], [-107.303436, 41.000168], [-107.918037, 41.00341], [-109.047638, 40.998474], [-110.001457, 40.997646], [-110.062477, 40.99794], [-111.050285, 40.996635], [-111.050911, 41.25848], [-111.050323, 41.578648], [-111.047951, 41.996265], [-111.046028, 42.503323], [-111.048447, 43.019962], [-111.04673, 43.284813], [-111.045998, 43.515606], [-111.049629, 43.982632], [-111.050789, 44.473396], [-111.050842, 44.664562], [-111.05265, 44.995766], [-110.428894, 44.992348], [-110.392006, 44.998688], [-109.994789, 45.002853], [-109.798653, 44.99958], [-108.624573, 44.997643], [-108.258568, 45.00016], [-107.893715, 44.999813], [-106.258644, 44.996174], [-106.020576, 44.997227], [-105.084465, 44.999832], [-105.04126, 45.001091], [-104.059349, 44.997349], [-104.058975, 44.574368], [-104.060547, 44.181843], [-104.059242, 44.145844], [-104.05899, 43.852928], [-104.057426, 43.503738], [-104.05867, 43.47916], [-104.05571, 43.003094], [-104.055725, 42.614704], [-104.053009, 41.999851], [-104.053108, 41.698246]]]]}, "geometry_name": "the_geom", "properties": {}}];
    return {
        type: LOAD_CANTIERI_AREA_FEATURES,
        myFeatures,
        checkedElementi
    };
}

module.exports = {
    ROWS_SELECTED, rowsSelected,
    ROWS_DESELECTED, rowsDeselected,
    INIT_ELEMENTI_PUBBLICI_PLUGIN, initPlugin,
    SET_ACTIVE_GRID, setActiveGrid,
    DELETE_CANTIERI_AREA, deleteCantieriArea,
    SET_ACTIVE_DRAW_TOOL, setActiveDrawTool,
    RESET_CANTIERI_AREAS, resetCantieriAreas,
    UPDATE_ELEMENTI_FEATURES, updateElementiFeatures,
    LOAD_CHECKED_ELEMENTI, loadCheckedElementi,
    LOAD_CANTIERI_AREA_FEATURES, loadCantieriAreaFeatures,
    MAX_FEATURES_EXCEEDED, maxFeaturesExceeded,
    SAVE_CANTIERI_DATA, saveCantieriData
};
