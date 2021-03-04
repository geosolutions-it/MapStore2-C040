/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const ROWS_SELECTED = "CANTIERI::ROWS_SELECTED";
export const ROWS_DESELECTED = "CANTIERI::ROWS_DESELECTED";
export const INIT_CANTIERI_PLUGIN = "INIT_CANTIERI_PLUGIN";
export const SET_ACTIVE_GRID = "SET_ACTIVE_GRID";
export const REMOVE_CANTIERI_AREA = "REMOVE_CANTIERI_AREA";
export const SET_ACTIVE_DRAW_TOOL = "SET_ACTIVE_DRAW_TOOL";
export const RESET_CANTIERI_FEATURES = "RESET_CANTIERI_FEATURES";
export const QUERY_ELEMENTS_FEATURES = "QUERY_ELEMENTS_FEATURES";
export const FETCH_CANTIERI_FEATURES = "FETCH_CANTIERI_FEATURES";
export const LOAD_CHECKED_ELEMENTS = "LOAD_CHECKED_ELEMENTS";
export const SAVE_CANTIERI_DATA = "SAVE_CANTIERI_DATA";
export const MAX_FEATURES_EXCEEDED = "MAX_FEATURES_EXCEEDED";
export const AREAS_LAYER = "CANTIERI::AREAS_LAYER";
export const ELEMENTS_LAYER = "CANTIERI::ELEMENTS_LAYER";
export const DATA_SAVED = "CANTIERI::DATA_SAVED";
export const SAVING_ERROR = "CANTIERI::SAVE_ERROR";
export const ERROR_REMOVE_CANTIERI_AREA = "ERROR_REMOVE_CANTIERI_AREA";
export const ERROR_RESET_CANTIERI_FEATURES = "ERROR_RESET_CANTIERI_FEATURES";
export const ERROR_LOAD_CANTIERI_AREAS = "ERROR_LOAD_CANTIERI_AREAS";
export const ERROR_QUERY_ELEMENTS_FEATURES = "ERROR_QUERY_ELEMENTS_FEATURES";
export const ERROR_DRAWING_AREAS = "ERROR_DRAWING_AREAS";
export const SUCCESS_SAVING = "SUCCESS_SAVING";
export const SAVING_DATA = "SAVING_DATA";
export const LOADING_DATA = "LOADING_DATA";
export const UPDATE_CHECKED_ELEMENTS = "UPDATE_CHECKED_ELEMENTS";

/**
 * updates in the state the selected rows
 * @memberof actions.cantieri
 * @param {object} row the row.. Something like:
 * ```
 *     {
 *       rowIdx: 0,
 *       row: {
 *         id: 22682,
 *         name: 'EDIFICI',
 *         key: 'EDIFICI.22682'
 *       }
 *     }
 * ```
 * @return {action} of type `ROWS_SELECTED`. example:
 * ```
 * {
 *   type: 'CANTIERI::ROWS_SELECTED',
 *   rows: [
 *     {
 *       rowIdx: 0,
 *       row: {
 *         id: 26185,
 *         name: 'EDIFICI',
 *         key: 'EDIFICI.26185'
 *       }
 *     }
 *   ]
 * }
 * ```
 */
export function rowsSelected(rows) {
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
export function rowsDeselected(rows) {
    return {
        type: ROWS_DESELECTED,
        rows
    };
}
/**
 * initialize the plugin (should be called on componentDidMount)
 * @memberof actions.cantieri
 * @return {action} of type `INIT_CANTIERI_PLUGIN`
 */
export function initPlugin(options) {
    return {
        type: INIT_CANTIERI_PLUGIN,
        options
    };
}
/**
 * udpates the active grid
 * @memberof actions.cantieri
 * @return {action} of type `SET_ACTIVE_GRID`
 */
export function setActiveGrid(activeGrid) {
    return {
        type: SET_ACTIVE_GRID,
        activeGrid
    };
}
/**
 * delete a row in the areas grid
 * @memberof actions.cantieri
 * @return {action} of type `REMOVE_CANTIERI_AREA`
 */
export function removeCantieriArea(area) {
    return {
        type: REMOVE_CANTIERI_AREA,
        area
    };
}
/**
 * clear all areas
 * @memberof actions.cantieri
 * @return {action} of type `RESET_CANTIERI_FEATURES`
 */
export function resetCantieriFeatures() {
    return {
        type: RESET_CANTIERI_FEATURES
    };
}
/**
 * queryElements query elements features
 * @memberof actions.cantieri
 * @param {object} filter the filter to use to query the layer
 * @return {action} of type `QUERY_ELEMENTS_FEATURES`
 */
export function queryElements(filter, check) {
    return {
        type: QUERY_ELEMENTS_FEATURES,
        filter,
        check
    };
}
/**
 * set the active draw tool
 * @memberof actions.cantieri
 * @return {action} of type `SET_ACTIVE_DRAW_TOOL`
 */
export function setActiveDrawTool(activeDrawTool) {
    return {
        type: SET_ACTIVE_DRAW_TOOL,
        activeDrawTool
    };
}
/**
 * load checked elementi
 * @memberof actions.cantieri
 * @return {action} of type `LOAD_CHECKED_ELEMENTS`
 */
export function loadCheckedElements(checkedElements) {
    return {
        type: LOAD_CHECKED_ELEMENTS,
        checkedElements
    };
}
/**
 * save data
 * @memberof actions.cantieri
 * @return {action} of type `SAVE_CANTIERI_DATA`
 */
export function saveCantieriData() {
    return {
        type: SAVE_CANTIERI_DATA
    };
}
/**
 * set up an error for the max features exceeded
 * @memberof actions.cantieri
 * @return {action} of type `MAX_FEATURES_EXCEEDED`
 */
export function maxFeaturesExceeded(status) {
    return {
        type: MAX_FEATURES_EXCEEDED,
        status
    };
}
/**
 * load area features
 * @memberof actions.cantieri
 * @return {action} of type `FETCH_CANTIERI_FEATURES`
 */
export function loadCantieriAreaFeatures() {
    return {
        type: FETCH_CANTIERI_FEATURES
    };
}

export function dataSaved(checkedElements, idCantiere, typology) {
    return {
        type: DATA_SAVED,
        checkedElements,
        idCantiere,
        typology
    };
}

export function savingError(error) {
    return {
        type: SAVING_ERROR,
        error
    };
}

export function savingData(status) {
    return {
        type: SAVING_DATA,
        status
    };
}

export function loadingData(status) {
    return {
        type: LOADING_DATA,
        status
    };
}
export function updateCheckedElements(elements) {
    return {
        type: UPDATE_CHECKED_ELEMENTS,
        elements
    };
}

export default {
    ROWS_SELECTED, rowsSelected,
    ROWS_DESELECTED, rowsDeselected,
    INIT_CANTIERI_PLUGIN, initPlugin,
    SET_ACTIVE_GRID, setActiveGrid,
    REMOVE_CANTIERI_AREA, removeCantieriArea,
    RESET_CANTIERI_FEATURES, resetCantieriFeatures,
    QUERY_ELEMENTS_FEATURES, queryElements,
    SET_ACTIVE_DRAW_TOOL, setActiveDrawTool,
    LOAD_CHECKED_ELEMENTS, loadCheckedElements,
    FETCH_CANTIERI_FEATURES, loadCantieriAreaFeatures,
    MAX_FEATURES_EXCEEDED, maxFeaturesExceeded,
    SAVE_CANTIERI_DATA, saveCantieriData,
    DATA_SAVED, dataSaved,
    SAVING_DATA, savingData,
    LOADING_DATA, loadingData,
    SAVING_ERROR, savingError,
    UPDATE_CHECKED_ELEMENTS, updateCheckedElements,
    AREAS_LAYER, ELEMENTS_LAYER,
    ERROR_REMOVE_CANTIERI_AREA, ERROR_RESET_CANTIERI_FEATURES,
    ERROR_LOAD_CANTIERI_AREAS, ERROR_QUERY_ELEMENTS_FEATURES,
    ERROR_DRAWING_AREAS, SUCCESS_SAVING
};
