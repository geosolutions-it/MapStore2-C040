/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const rows = [{
    rowIdx: 0,
    row: {
        id: 26185,
        name: 'EDIFICI',
        key: 'EDIFICI.26185'
    }
}
];
const expect = require('expect');
const {
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
    SAVING_ERROR, savingError
} = require('../cantieri');

describe('Testing the cantieri actions', () => {
    it('rowsSelected', () => {
        const retval = rowsSelected(rows);
        expect(retval).toExist();
        expect(retval.type).toBe(ROWS_SELECTED);
        expect(retval.rows).toBe(rows);
    });
    it('rowsDeselected', () => {
        const retval = rowsDeselected(rows);
        expect(retval).toExist();
        expect(retval.type).toBe(ROWS_DESELECTED);
        expect(retval.rows).toBe(rows);
    });
    it('initPlugin', () => {
        const options = {geoserverUrl: "somepath"};
        const retval = initPlugin(options);
        expect(retval).toExist();
        expect(retval.type).toBe(INIT_CANTIERI_PLUGIN);
        expect(retval.options).toBe(options);
    });
    it('setActiveGrid', () => {
        const activeGrid = "areasGrid";
        const retval = setActiveGrid(activeGrid);
        expect(retval).toExist();
        expect(retval.type).toBe(SET_ACTIVE_GRID);
        expect(retval.activeGrid).toBe(activeGrid);
    });
    it('removeCantieriArea', () => {
        const area = "area_1";
        const retval = removeCantieriArea(area);
        expect(retval).toExist();
        expect(retval.type).toBe(REMOVE_CANTIERI_AREA);
        expect(retval.area).toBe(area);
    });
    it('resetCantieriFeatures', () => {
        const retval = resetCantieriFeatures();
        expect(retval).toExist();
        expect(retval.type).toBe(RESET_CANTIERI_FEATURES);
    });
    it('queryElements', () => {
        const retval = queryElements();
        expect(retval).toExist();
        expect(retval.type).toBe(QUERY_ELEMENTS_FEATURES);
    });
    it('setActiveDrawTool', () => {
        const activeDrawTool = "pointSelection";
        const retval = setActiveDrawTool(activeDrawTool);
        expect(retval).toExist();
        expect(retval.type).toBe(SET_ACTIVE_DRAW_TOOL);
    });
    it('loadCheckedElements', () => {
        const checkedElements = [["22682", "EDIFICI"]];
        const retval = loadCheckedElements(checkedElements);
        expect(retval).toExist();
        expect(retval.type).toBe(LOAD_CHECKED_ELEMENTS);
        expect(retval.checkedElements).toBe(checkedElements);
    });
    it('maxFeaturesExceeded', () => {
        const status = true;
        const retval = maxFeaturesExceeded(status);
        expect(retval).toExist();
        expect(retval.type).toBe(MAX_FEATURES_EXCEEDED);
        expect(retval.status).toBe(status);
    });
    it('loadCantieriAreaFeatures', () => {
        const retval = loadCantieriAreaFeatures();
        expect(retval).toExist();
        expect(retval.type).toBe(FETCH_CANTIERI_FEATURES);
    });
    it('saveCantieriData', () => {
        const retval = saveCantieriData();
        expect(retval).toExist();
        expect(retval.type).toBe(SAVE_CANTIERI_DATA);
    });
    it('savingData', () => {
        const status = true;
        const retval = savingData(status);
        expect(retval).toExist();
        expect(retval.type).toBe(SAVING_DATA);
        expect(retval.status).toBe(status);
    });
    it('loadingData', () => {
        const status = true;
        const retval = loadingData(status);
        expect(retval).toExist();
        expect(retval.type).toBe(LOADING_DATA);
        expect(retval.status).toBe(status);
    });
    it('savingError', () => {
        const error = "error";
        const retval = savingError(error);
        expect(retval).toExist();
        expect(retval.type).toBe(SAVING_ERROR);
        expect(retval.error).toBe(error);
    });
    it('dataSaved', () => {
        const checkedElements = [["22682", "EDIFICI"]];
        const idCantiere = 0;
        const typology = "cantiere";
        const retval = dataSaved(checkedElements, idCantiere, typology);
        expect(retval).toExist();
        expect(retval.type).toBe(DATA_SAVED);
        expect(retval.checkedElements).toBe(checkedElements);
        expect(retval.idCantiere).toBe(idCantiere);
        expect(retval.typology).toBe(typology);
    });

});
