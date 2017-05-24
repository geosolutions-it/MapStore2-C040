/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const ROWS_SELECTED = "ROWS_SELECTED";
const ROWS_DESELECTED = "ROWS_DESELECTED";
const INIT_LAVORI_PUBBLICI_PLUGIN = "INIT_LAVORI_PUBBLICI_PLUGIN";
const UPDATE_AREAS = "UPDATE_AREAS";
const SET_ACTIVE_GRID = "SET_ACTIVE_GRID";
const DELETE_CANTIERI_AREA = "DELETE_CANTIERI_AREA";
const SET_ACTIVE_DRAW_TOOL = "SET_ACTIVE_DRAW_TOOL";
const RESET_CANTIERI_AREAS = "RESET_CANTIERI_AREAS";
const UPDATE_LAVORI_FEATURES = "UPDATE_LAVORI_FEATURES";

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
 * @return {action} of type `INIT_LAVORI_PUBBLICI_PLUGIN`
 */
function initPlugin(options) {
    return {
        type: INIT_LAVORI_PUBBLICI_PLUGIN,
        options
    };
}
/**
 * udpates the features collected from drawing a polygon or clicking on the map
 * @memberof actions.cantieri
 * @return {action} of type `UPDATE_AREAS`
 */
function updateAreas(features) {
    return {
        type: UPDATE_AREAS,
        features
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
 * update lavori features
 * @memberof actions.cantieri
 * @return {action} of type `UPDATE_LAVORI_FEATURES`
 */
function updateLavoriFeatures() {
    return {
        type: UPDATE_LAVORI_FEATURES
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

module.exports = {
    ROWS_SELECTED, rowsSelected,
    ROWS_DESELECTED, rowsDeselected,
    INIT_LAVORI_PUBBLICI_PLUGIN, initPlugin,
    UPDATE_AREAS, updateAreas,
    SET_ACTIVE_GRID, setActiveGrid,
    DELETE_CANTIERI_AREA, deleteCantieriArea,
    SET_ACTIVE_DRAW_TOOL, setActiveDrawTool,
    RESET_CANTIERI_AREAS, resetCantieriAreas,
    UPDATE_LAVORI_FEATURES, updateLavoriFeatures
};
