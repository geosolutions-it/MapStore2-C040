/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const { ROWS_SELECTED, ROWS_DESELECTED, INIT_LAVORI_PUBBLICI_PLUGIN, UPDATE_AREAS, SET_ACTIVE_GRID,
DELETE_AREA, SET_ACTIVE_DRAW_TOOL } = require('../actions/cantieri');
const assign = require('object-assign');
const {indexOf} = require('lodash');

function cantieri(state = {
    featureGrid: {
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
    activeGrid: "featureGrid",
    open: true
}, action) {
    switch (action.type) {
        case INIT_LAVORI_PUBBLICI_PLUGIN: {
            return assign({}, state, {toolbar: {
                    activeTools: action.options.activeTools,
                    inactiveTools: action.options.inactiveTools
                },
                geoserverUrl: action.options.geoserverUrl,
                activeGrid: action.options.activeGrid
            });
        }
        case ROWS_SELECTED: {
            let newValues = {
                keys: {rowKey: 'id', values: action.rows.map(r => r.row.id.toString()).concat(state && state.featureGrid && state.featureGrid.selectBy && state.featureGrid.selectBy.keys && state.featureGrid.selectBy.keys.values || [])}
            };
            return assign({}, state, assign({}, {featureGrid: {...state.featureGrid, selectBy: newValues}}) );
        }
        case ROWS_DESELECTED: {
            let newValues = {
                keys: {rowKey: 'id', values: state && state.featureGrid && state.featureGrid.selectBy && state.featureGrid.selectBy.keys && state.featureGrid.selectBy.keys.values.filter(v => v !== action.rows[0].row.id) || []}
            };
            return assign({}, state, assign({}, {featureGrid: {...state.featureGrid, selectBy: newValues}}) );
        }
        case UPDATE_AREAS: {
            // add only new areas
            let newFeatures = action.features.filter(f => indexOf(state.areasGrid.areas.map(a => a.id), f.id) === -1);
            const areas = state.areasGrid.areas.concat(newFeatures);
            newFeatures = areas.map((a) => {
                return {"delete": "X", "name": a.id};
            });
            return assign({}, state, {areasGrid: {...state.areasGrid, areas, features: newFeatures}} );
        }
        case SET_ACTIVE_GRID: {
            const activeGrid = action.activeGrid;
            const otherGrid = activeGrid === "featureGrid" ? "areasGrid" : "featureGrid";
            const newActiveTools = state.toolbar.activeTools.concat(activeGrid).filter(i => i !== otherGrid);
            const newInActiveTools = state.toolbar.inactiveTools.concat(otherGrid).filter(i => i !== activeGrid);
            return assign({}, state, { activeGrid: action.activeGrid }, {
                toolbar: {
                        activeTools: newActiveTools,
                        inactiveTools: newInActiveTools
                    }});
        }
        case SET_ACTIVE_DRAW_TOOL: {
            const activeDrawTool = action.activeDrawTool;
            const otherDrawTool = activeDrawTool === "pointSelection" ? "polygonSelection" : "pointSelection";
            const newActiveTools = state.toolbar.activeTools.concat(activeDrawTool).filter(i => i !== otherDrawTool);
            const newInActiveTools = state.toolbar.inactiveTools.concat(otherDrawTool).filter(i => i !== activeDrawTool);
            return assign({}, state, {
                toolbar: {
                        activeTools: newActiveTools,
                        inactiveTools: newInActiveTools
                    }});
        }
        case DELETE_AREA: {
            const areas = state.areasGrid.areas.filter(a => a.id !== action.area);
            const newFeatures = areas.map((a) => {
                return {"delete": "X", "name": a.id};
            });
            return assign({}, state, {areasGrid: {...state.areasGrid, areas, features: newFeatures}} );
        }
        default:
            return state;
    }
}

module.exports = cantieri;
