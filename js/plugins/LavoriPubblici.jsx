/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {createSelector}  from 'reselect';
import {connect}  from 'react-redux';
import {query}  from '../../MapStore2/web/client/actions/wfsquery';
import {changeMapView}  from '../../MapStore2/web/client/actions/map';
import {changeDrawingStatus}  from '../../MapStore2/web/client/actions/draw';
import {dockSizeFeatures}  from '../../MapStore2/web/client/actions/featuregrid';
import {rowsSelected, rowsDeselected, initPlugin, setActiveGrid, removeCantieriArea, setActiveDrawTool, resetCantieriFeatures,
    saveCantieriData, maxFeaturesExceeded, savingData }  from '../actions/cantieri';
import epics  from '../epics/cantieri';
import {featureToRow}  from '../utils/CantieriUtils';
import {toggleControl}  from '../../MapStore2/web/client/actions/controls';
import {stateSelector, elementsLayerSelector, areasLayerSelector}  from '../selector/cantieri';
import cantieri from '../reducers/cantieri';
import CantieriPanel from '../components/CantieriPanel';
import ResizableGrid from '../../MapStore2/web/client/components/misc/ResizableGrid';
import CantieriAreaGrid from '../components/CantieriAreaGrid';
import { createPlugin } from '@mapstore/utils/PluginsUtils';

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
    })(ResizableGrid);


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
    })(CantieriAreaGrid);

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
    })(CantieriPanel);

export default createPlugin('LavoriPubblici', {
    component: Dock,
    reducers: {cantieri},
    epics
});
