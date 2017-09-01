/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const expect = require('expect');
const {
    initPlugin,
    setActiveGrid,
    maxFeaturesExceeded,
    savingData,
    loadingData,
    setActiveDrawTool
} = require('../../actions/cantieri');
const cantieri = require('../cantieri');

describe('Testing the cantieri reducers', () => {
    it('initPlugin', () => {
        const initialState = {};
        const options = {
            fetchServiceRESTUrl: "/",
            saveServiceRESTUrl: "/"};
        const state = cantieri(initialState, initPlugin(options) );
        expect(state.hasOwnProperty('fetchServiceRESTUrl')).toBe(true);
        expect(state.hasOwnProperty('saveServiceRESTUrl')).toBe(true);
        expect(state.fetchServiceRESTUrl).toBe("/");
        expect(state.saveServiceRESTUrl).toBe("/");
    });
    it('setActiveGrid', () => {
        let activeTools = ["elementsGrid", "pointSelection"];
        let inactiveTools = ["areasGrid", "polygonSelection"];
        const initialState = {
            toolbar: {
                activeTools,
                inactiveTools
            }
        };
        const activeGrid = "areasGrid";
        const inactiveGrid = "elementsGrid";
        const state = cantieri(initialState, setActiveGrid(activeGrid) );
        expect(state.hasOwnProperty('activeGrid')).toBe(true);
        expect(state.hasOwnProperty('toolbar')).toBe(true);
        expect(state.toolbar.hasOwnProperty('activeTools')).toBe(true);
        expect(state.toolbar.hasOwnProperty('inactiveTools')).toBe(true);
        expect(state.activeGrid).toBe(activeGrid);
        expect(state.toolbar.activeTools.length).toBe(2);
        expect(state.toolbar.activeTools.indexOf(activeGrid) !== -1).toBe(true);
        expect(state.toolbar.activeTools.indexOf(inactiveGrid) === -1).toBe(true);
        expect(state.toolbar.inactiveTools.length).toBe(2);
        expect(state.toolbar.inactiveTools.indexOf(inactiveGrid) !== -1).toBe(true);
        expect(state.toolbar.inactiveTools.indexOf(activeGrid) === -1).toBe(true);
    });
    it('maxFeaturesExceeded', () => {
        const initialState = {maxFeaturesExceeded: false};
        const maxFeaturesExceededValue = true;
        const state = cantieri(initialState, maxFeaturesExceeded(maxFeaturesExceededValue) );
        expect(state.hasOwnProperty('maxFeaturesExceeded')).toBe(true);
        expect(state.maxFeaturesExceeded).toBe(maxFeaturesExceededValue);
    });
    it('savingData', () => {
        const initialState = {saving: false};
        const status = true;
        const state = cantieri(initialState, savingData(status) );
        expect(state.hasOwnProperty('saving')).toBe(true);
        expect(state.saving).toBe(status);
    });
    it('loadingData', () => {
        const initialState = {loading: false};
        const status = true;
        const state = cantieri(initialState, loadingData(status) );
        expect(state.hasOwnProperty('loading')).toBe(true);
        expect(state.loading).toBe(status);
    });
    it('setActiveDrawTool toggling', () => {
        let activeTools = ["elementsGrid", "pointSelection"];
        let inactiveTools = ["areasGrid", "polygonSelection"];
        const initialState = {
            toolbar: {
                activeTools,
                inactiveTools
            }
        };
        const activeDrawTool = "polygonSelection";
        const inactiveDrawTool = "pointSelection";
        const state = cantieri(initialState, setActiveDrawTool(activeDrawTool) );
        expect(state.hasOwnProperty('toolbar')).toBe(true);
        expect(state.toolbar.activeTools.length).toBe(2);
        expect(state.toolbar.activeTools.indexOf(activeDrawTool) !== -1).toBe(true);
        expect(state.toolbar.activeTools.indexOf(inactiveDrawTool) === -1).toBe(true);
        expect(state.toolbar.inactiveTools.length).toBe(2);
        expect(state.toolbar.inactiveTools.indexOf(activeDrawTool) === -1).toBe(true);
        expect(state.toolbar.inactiveTools.indexOf(inactiveDrawTool) !== -1).toBe(true);
    });
    it('setActiveDrawTool disabling the previously selected one', () => {
        let activeTools = ["elementsGrid", "pointSelection"];
        let inactiveTools = ["areasGrid", "polygonSelection"];
        const initialState = {
            toolbar: {
                activeTools,
                inactiveTools
            }
        };
        const activeDrawTool = "pointSelection";
        const state = cantieri(initialState, setActiveDrawTool(activeDrawTool) );
        expect(state.hasOwnProperty('toolbar')).toBe(true);
        expect(state.toolbar.activeTools.length).toBe(1);
        expect(state.toolbar.activeTools.indexOf(activeDrawTool) === -1).toBe(true);
        expect(state.toolbar.inactiveTools.length).toBe(3);
        expect(state.toolbar.inactiveTools.indexOf(activeDrawTool) !== -1).toBe(true);
    });

});
