/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { ROWS_SELECTED, ROWS_DESELECTED, INIT_ELEMENTI_PUBBLICI_PLUGIN, SET_ACTIVE_GRID, MAX_FEATURES_EXCEEDED,
SET_ACTIVE_DRAW_TOOL, LOAD_CHECKED_ELEMENTI } = require('../actions/cantieri');
const assign = require('object-assign');
const {difference, indexOf} = require('lodash');

function cantieri(state = {
    elementiGrid: {
        rowKey: "id",
        areas: [],
        features: [],
        columns: [{
            key: 'id',
            name: 'id',
            resizable: true
        }, {
            key: 'name',
            name: 'nome livello',
            resizable: true
        }],
        selectBy: {
            keys: {
                rowKey: '',
                values: []
            }
        }
    },
    areasGrid: {
        rowKey: "name",
        areas: [],
        features: [],
        columns: [{
        key: 'delete',
        name: 'Elimina',
        resizable: true
    }, {
        key: 'name',
        name: 'nome area',
        resizable: true
    }]},
    activeGrid: "elementiGrid",
    open: true
}, action) {
    switch (action.type) {
        case INIT_ELEMENTI_PUBBLICI_PLUGIN: {
            return assign({}, state, {toolbar: {
                    activeTools: action.options.activeTools,
                    inactiveTools: action.options.inactiveTools
                },
                geoserverUrl: action.options.geoserverUrl,
                activeGrid: action.options.activeGrid,
                maxFeatures: action.options.maxFeatures
            });
        }
        case LOAD_CHECKED_ELEMENTI: {
            let newValues = {
                keys: {rowKey: 'id', values: action.checkedElementi}
            };
            return assign({}, state, {elementiGrid: {...state.elementiGrid, selectBy: newValues}} );
        }
        case ROWS_SELECTED: {
            let newValues = {
                keys: {rowKey: 'id', values: action.rows.map(r => r.row.id).concat(state && state.elementiGrid && state.elementiGrid.selectBy && state.elementiGrid.selectBy.keys && state.elementiGrid.selectBy.keys.values || [])}
            };
            return assign({}, state, {elementiGrid: {...state.elementiGrid, selectBy: newValues}} );
        }
        case ROWS_DESELECTED: {
            let rowNames = action.rows.map(r => r.row.id);

            let newValues = {
                keys: {rowKey: 'id', values: state && state.elementiGrid && state.elementiGrid.selectBy && state.elementiGrid.selectBy.keys && difference(state.elementiGrid.selectBy.keys.values, rowNames) || []}
            };
            return assign({}, state, {elementiGrid: {...state.elementiGrid, selectBy: newValues}} );
        }
        case SET_ACTIVE_GRID: {
            const activeGrid = action.activeGrid;
            const otherGrid = activeGrid === "elementiGrid" ? "areasGrid" : "elementiGrid";
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
        default:
            return state;
    }
}

module.exports = cantieri;
