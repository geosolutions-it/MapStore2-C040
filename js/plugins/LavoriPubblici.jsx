/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {connect} = require('react-redux');
const {query, closeResponse} = require('../../MapStore2/web/client/actions/wfsquery');
const {changeMapView} = require('../../MapStore2/web/client/actions/map');
const {changeDrawingStatus} = require('../../MapStore2/web/client/actions/draw');
const {dockSizeFeatures} = require('../../MapStore2/web/client/actions/featuregrid');
const {rowsSelected, rowsDeselected, initPlugin, setActiveGrid, deleteCantieriArea, setActiveDrawTool, resetCantieriAreas} = require('../actions/cantieri');
const {addOrUpdateCantieriAreaLayer, addOrUpdateCantieriAreaLayerByClick,
       deleteCantieriAreaFeature, resetCantieriAreaFeatures, updateLavoriFeatures} = require('../epics/cantieriEpic');
const getLayer = (state) => {
    return state.layers.flat.filter(l => l.id === "cantieri_area_layer")[0];
};
const LavoriGrid = connect((state) => ({
    minHeight: state.cantieri.featureGrid.minHeight,
    minWidth: state.cantieri.featureGrid.minWidth,
    rows: state.cantieri.featureGrid.features,
    columns: state.cantieri.featureGrid.columns,
    rowSelection: {
        showCheckbox: true,
        enableShiftSelect: true,
        onRowsSelected: rowsSelected,
        onRowsDeselected: rowsDeselected,
        selectBy: state.cantieri.featureGrid.selectBy
    }
}), {})(require('../../MapStore2/web/client/components/misc/ResizableGrid'));

const AreasGrid = connect((state) => ({
    minHeight: state.cantieri.areasGrid.minHeight,
    minWidth: state.cantieri.areasGrid.minWidth,
    rows: getLayer(state) ? getLayer(state).features.map((a) => {
        return {"delete": "X", "name": a.id};
    }) : [],
    columns: state.cantieri.areasGrid.columns
}), {
    onDeleteRow: deleteCantieriArea
})(require('../components/CantieriAreaGrid'));

const Dock = connect((state) => ({
    activeGrid: state.cantieri && state.cantieri.activeGrid,
    dockSize: state.highlight && state.highlight.dockSize,
    selectBy: state.cantieri.activeGrid === "featureGrid" ? state.cantieri.featureGrid.selectBy : null,
    toolbar: state.cantieri && state.cantieri.toolbar,
    wrappedComponent: state.cantieri.activeGrid === "featureGrid" ? LavoriGrid : AreasGrid
}), {
    changeMapView,
    onQuery: query,
    onInitPlugin: initPlugin,
    onActiveGrid: setActiveGrid,
    onActiveDrawTool: setActiveDrawTool,
    onDrawPolygon: changeDrawingStatus,
    onResetCantieriAreas: resetCantieriAreas,
    onBackToSearch: closeResponse,
    setDockSize: dockSizeFeatures
})(require('../components/CantieriPanel'));

module.exports = {
    LavoriPubbliciPlugin: Dock,
    reducers: {cantieri: require('../reducers/cantieri')},
    epics: {addOrUpdateCantieriAreaLayer, addOrUpdateCantieriAreaLayerByClick,
            deleteCantieriAreaFeature, resetCantieriAreaFeatures, updateLavoriFeatures}
};
