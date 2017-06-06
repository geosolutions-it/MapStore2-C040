/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {createSelector} = require('reselect');
const {connect} = require('react-redux');
const {query, closeResponse} = require('../../MapStore2/web/client/actions/wfsquery');
const {changeMapView} = require('../../MapStore2/web/client/actions/map');
const {changeDrawingStatus} = require('../../MapStore2/web/client/actions/draw');
const {dockSizeFeatures} = require('../../MapStore2/web/client/actions/featuregrid');
const {rowsSelected, rowsDeselected, initPlugin, setActiveGrid, deleteCantieriArea, setActiveDrawTool, resetCantieriAreas,
saveCantieriData, maxFeaturesExceeded, ELEMENTS_LAYER, AREAS_LAYER } = require('../actions/cantieri');
const epics = require('../epics/cantieri');
const {featureToRow} = require('../utils/CantieriUtils');

const stateSelector = state => state;
const elementsLayerSelector = (state) => state.layers && state.layers.flat && state.layers.flat.filter(l => l.id === ELEMENTS_LAYER)[0];
const areaLayerSelector = (state) => state.layers && state.layers.flat && state.layers.flat.filter(l => l.id === AREAS_LAYER)[0];

const ElementiGrid = connect(
createSelector(elementsLayerSelector, stateSelector, (layer, state) => ({
    minHeight: state.cantieri.elementiGrid.minHeight,
    minWidth: state.cantieri.elementiGrid.minWidth,
    rows: layer && layer.features ? layer.features.map(featureToRow) : [],
    columns: state.cantieri.elementiGrid.columns,
    selectBy: {isSelectedKey: 'checked'},
    rowSelection: {
        showCheckbox: true
    }
})), {
    onRowsSelected: rowsSelected,
    onRowsDeselected: rowsDeselected
})(require('../../MapStore2/web/client/components/misc/ResizableGrid'));


const AreasGrid = connect(
    createSelector([areaLayerSelector, stateSelector], (layer, state) => ({
    minHeight: state.cantieri.areasGrid.minHeight,
    minWidth: state.cantieri.areasGrid.minWidth,
    rows: layer && layer.features ? layer.features.map((a) => {
        return {"delete": "X", "name": a.properties && a.properties.ID || a.id};
    }) : [],
    columns: state.cantieri.areasGrid.columns,
    rowSelection: {
        showCheckbox: false
    }
})), {
    onDeleteRow: deleteCantieriArea
})(require('../components/CantieriAreaGrid'));

const Dock = connect(
    createSelector([elementsLayerSelector, stateSelector], (layer, state) => ({
        activeGrid: state.cantieri && state.cantieri.activeGrid,
        dockSize: state.highlight && state.highlight.dockSize,
        maxFeaturesExceeded: state.cantieri && state.cantieri.maxFeaturesExceeded,
        position: "bottom",
        selectBy: state.cantieri.activeGrid === "elementiGrid" ? {isSelectedKey: 'checked'} : null,
        toolbar: state.cantieri && state.cantieri.toolbar,
        elementsSelected: layer && layer.features ? layer.features.filter(f => f.checked).length : 0,
        wrappedComponent: state.cantieri.activeGrid === "elementiGrid" ? ElementiGrid : AreasGrid
    })), {
    changeMapView,
    onQuery: query,
    onInitPlugin: initPlugin,
    onActiveGrid: setActiveGrid,
    onActiveDrawTool: setActiveDrawTool,
    onSave: saveCantieriData,
    onDrawPolygon: changeDrawingStatus,
    onResetCantieriAreas: resetCantieriAreas,
    onHideModal: maxFeaturesExceeded,
    onBackToSearch: closeResponse,
    setDockSize: dockSizeFeatures
})(require('../components/CantieriPanel'));

module.exports = {
    LavoriPubbliciPlugin: Dock,
    reducers: {cantieri: require('../reducers/cantieri')},
    epics
};
