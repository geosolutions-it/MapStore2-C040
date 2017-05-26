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
const {rowsSelected, rowsDeselected, initPlugin, setActiveGrid, deleteCantieriArea, setActiveDrawTool, resetCantieriAreas,
saveCantieriData, maxFeaturesExceeded } = require('../actions/cantieri');
const {addOrUpdateCantieriAreaLayer, addOrUpdateCantieriAreaLayerByClick, loadCantieriAreaFeaturesEpic,
       deleteCantieriAreaFeature, resetCantieriAreaFeatures, updateElementiFeaturesEpic} = require('../epics/cantieriEpic');
const getAreaLayer = (state) => {
    return state.layers.flat.filter(l => l.id === "cantieri_area_layer")[0];
};
const getElementiLayer = (state) => {
    return state.layers.flat.filter(l => l.id === "cantieri_elementi_layer")[0];
};
const ElementiGrid = connect((state) => ({
    minHeight: state.cantieri.elementiGrid.minHeight,
    minWidth: state.cantieri.elementiGrid.minWidth,
    rows: getElementiLayer(state) ? getElementiLayer(state).features.map((a) => {
        return {"id": a.properties.ID, "name": a.properties.NOME_LIVELLO};
    }) : [],
    columns: state.cantieri.elementiGrid.columns,
    selectBy: state.cantieri.elementiGrid.selectBy,
    rowSelection: {
        showCheckbox: true
    }
}), {
    onRowsSelected: rowsSelected,
    onRowsDeselected: rowsDeselected
})(require('../../MapStore2/web/client/components/misc/ResizableGrid'));

const AreasGrid = connect((state) => ({
    minHeight: state.cantieri.areasGrid.minHeight,
    minWidth: state.cantieri.areasGrid.minWidth,
    rows: getAreaLayer(state) ? getAreaLayer(state).features.map((a) => {
        return {"delete": "X", "name": a.properties && a.properties.ID || a.id};
    }) : [],
    columns: state.cantieri.areasGrid.columns,
    rowSelection: {
        showCheckbox: false
    }
}), {
    onDeleteRow: deleteCantieriArea
})(require('../components/CantieriAreaGrid'));

const Dock = connect((state) => ({
    activeGrid: state.cantieri && state.cantieri.activeGrid,
    dockSize: state.highlight && state.highlight.dockSize,
    maxFeaturesExceeded: state.cantieri && state.cantieri.maxFeaturesExceeded,
    position: "right",
    selectBy: state.cantieri.activeGrid === "elementiGrid" ? state.cantieri.elementiGrid.selectBy : null,
    toolbar: state.cantieri && state.cantieri.toolbar,
    wrappedComponent: state.cantieri.activeGrid === "elementiGrid" ? ElementiGrid : AreasGrid
}), {
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
    epics: {addOrUpdateCantieriAreaLayer, addOrUpdateCantieriAreaLayerByClick, loadCantieriAreaFeaturesEpic,
            deleteCantieriAreaFeature, resetCantieriAreaFeatures, updateElementiFeaturesEpic}
};
