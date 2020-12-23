/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import main from '@mapstore/product/main';
import Embedded from '@js/pages/Embedded';
import FeatureViewer from '@js/pages/FeatureViewer';
import MapViewer from '@mapstore/product/pages/MapViewer';
import StandardRouter from '@mapstore/components/app/StandardRouter';
import appConfigEmbedded from '@js/appConfigEmbedded';
import apiPlugins from '@js/apiPlugins.js';

const pages = [{
    name: "embedviewer",
    path: "/:mapId",
    component: Embedded
}, {
    name: "viewer",
    path: "/featureviewer/:mapType/:layer/:cql_filter",
    component: FeatureViewer
}, {
    name: "mapviewer",
    path: "/viewer/:mapType/:mapId",
    component: MapViewer
}, {
    name: "wmsviewer",
    path: "/wmsfeatureviewer/:mapType/:layer/:cql_filter",
    component: FeatureViewer
}];
const routerSelector = createSelector(state => state.locale, (locale) => ({
    locale: locale || {},
    version: "no-version",
    themeCfg: {
        theme: "comge"
    },
    pages
}));
const ConnectedStandardRouter = connect(routerSelector)(StandardRouter);

main(
    appConfigEmbedded,
    apiPlugins,
    (cfg) => ({
        ...cfg,
        appComponent: ConnectedStandardRouter
    })
);
