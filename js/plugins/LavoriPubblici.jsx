/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {createSelector} = require('reselect');
const {connect} = require('react-redux');
const {query} = require('../../MapStore2/web/client/actions/wfsquery');
const {changeMapView} = require('../../MapStore2/web/client/actions/map');
const {changeDrawingStatus} = require('../../MapStore2/web/client/actions/draw');
const {dockSizeFeatures} = require('../../MapStore2/web/client/actions/featuregrid');
const {rowsSelected, rowsDeselected, initPlugin, setActiveGrid, removeCantieriArea, setActiveDrawTool, resetCantieriFeatures,
    saveCantieriData, maxFeaturesExceeded, savingData } = require('../actions/cantieri');
const epics = require('../epics/cantieri');
const {featureToRow} = require('../utils/CantieriUtils');
const {toggleControl} = require('../../MapStore2/web/client/actions/controls');
const {stateSelector, elementsLayerSelector, areasLayerSelector} = require('../selector/cantieri');

const ElementsGrid = connect(
    createSelector(elementsLayerSelector, stateSelector, (layer, state) => ({
        minHeight: state.cantieri.elementsGrid.minHeight,
        minWidth: state.cantieri.elementsGrid.minWidth,
        rows: layer && layer.features ? layer.features.map(featureToRow) : [],
        columns: state.cantieri.elementsGrid.columns,
        selectBy: {isSelectedKey: 'checked'},
        rowSelection: {
            showCheckbox: true
        }
    })), {
        onRowsSelected: rowsSelected,
        onRowsDeselected: rowsDeselected
    })(require('../../MapStore2/web/client/components/misc/ResizableGrid'));


const AreasGrid = connect(
    createSelector([areasLayerSelector, stateSelector], (layer, state) => ({
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
        onDeleteRow: removeCantieriArea
    })(require('../components/CantieriAreaGrid'));

const Dock = connect(
    createSelector([elementsLayerSelector, stateSelector], (layer, state) => ({
        activeGrid: state.cantieri && state.cantieri.activeGrid,
        dockSize: state.highlight && state.highlight.dockSize,
        maxFeaturesExceeded: state.cantieri && state.cantieri.maxFeaturesExceeded,
        saving: state.cantieri && state.cantieri.saving,
        loading: state.cantieri && state.cantieri.loading,
        position: "right",
        show: state.controls && state.controls.cantieri && state.controls.cantieri.enabled,
        selectBy: state.cantieri && state.cantieri.activeGrid === "elementsGrid" ? {isSelectedKey: 'checked'} : null,
        toolbar: state.cantieri && state.cantieri.toolbar,
        elementsSelected: layer && layer.features ? layer.features.filter(f => f.checked).length : 0,
        wrappedComponent: state.cantieri && state.cantieri.activeGrid === "elementsGrid" ? ElementsGrid : AreasGrid
    })), {
        changeMapView,
        onQuery: query,
        onInitPlugin: initPlugin,
        onActiveGrid: setActiveGrid,
        onActiveDrawTool: setActiveDrawTool,
        onSave: saveCantieriData,
        onDrawPolygon: changeDrawingStatus,
        onResetCantieriFeatures: resetCantieriFeatures,
        onToggleGrid: toggleControl.bind(null, 'cantieri', null),
        onHideModal: maxFeaturesExceeded,
        onHideSavingModal: savingData,
        setDockSize: dockSizeFeatures
    })(require('../components/CantieriPanel'));

module.exports = {
    LavoriPubbliciPlugin: Dock,
    reducers: {cantieri: require('../reducers/cantieri')},
    epics
};
