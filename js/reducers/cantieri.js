/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { INIT_CANTIERI_PLUGIN, SET_ACTIVE_GRID, MAX_FEATURES_EXCEEDED, SET_ACTIVE_DRAW_TOOL, SAVING_DATA, LOADING_DATA} = require('../actions/cantieri');
const assign = require('object-assign');
const {indexOf} = require('lodash');

function cantieri(state = {
    elementsGrid: {
        rowKey: "id",
        columns: [{
            key: 'id',
            name: 'ID',
            resizable: true
        }, {
            key: 'name',
            name: 'Nome Livello',
            resizable: true
        }],
        selectBy: {isSelectedKey: 'checked'}
    },
    areasGrid: {
        rowKey: "name",
        columns: [{
        key: 'delete',
        name: 'Elimina',
        resizable: true
    }, {
        key: 'name',
        name: 'nome area',
        resizable: true
    }]},
    activeGrid: "elementsGrid",
    open: true
}, action) {
    switch (action.type) {
        case INIT_CANTIERI_PLUGIN: {
            return assign({}, state, action.options );
        }
        case SET_ACTIVE_GRID: {
            const activeGrid = action.activeGrid;
            const otherGrid = activeGrid === "elementsGrid" ? "areasGrid" : "elementsGrid";
            const newActiveTools = state.toolbar.activeTools.concat(activeGrid).filter(i => i !== otherGrid);
            const newInactiveTools = state.toolbar.inactiveTools.concat(otherGrid).filter(i => i !== activeGrid);
            return assign({}, state, { activeGrid: action.activeGrid }, {
                toolbar: {
                        activeTools: newActiveTools,
                        inactiveTools: newInactiveTools
                    }});
        }
        case SET_ACTIVE_DRAW_TOOL: {
            const activeDrawTool = action.activeDrawTool;
            const otherDrawTool = activeDrawTool === "pointSelection" ? "polygonSelection" : "pointSelection";
            // if a tool is already active disable it
            let newActiveTools;
            let newInactiveTools;
            if (indexOf(state.toolbar.activeTools, activeDrawTool) !== -1) {
                newActiveTools = state.toolbar.activeTools.filter(i => i !== activeDrawTool);
                newInactiveTools = state.toolbar.inactiveTools.concat(activeDrawTool);
            } else {
                newActiveTools = state.toolbar.activeTools.concat(activeDrawTool).filter(i => i !== otherDrawTool);
                newInactiveTools = state.toolbar.inactiveTools.concat(otherDrawTool).filter(i => i !== activeDrawTool);
            }
            return assign({}, state, {
                toolbar: {
                        activeTools: newActiveTools,
                        inactiveTools: newInactiveTools
                    }});
        }
        case MAX_FEATURES_EXCEEDED: {
            return assign({}, state, {maxFeaturesExceeded: action.status});
        }
        case SAVING_DATA: {
            return assign({}, state, {saving: action.status});
        }
        case LOADING_DATA: {
            return assign({}, state, {loading: action.status});
        }
        default:
            return state;
    }
}

module.exports = cantieri;
