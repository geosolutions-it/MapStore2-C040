/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const {connect} = require('react-redux');
const {createSelector} = require('reselect');
const pages = [{
    name: "embedviewer",
    path: "/:mapId",
    component: require('./pages/Embedded')
}, {
    name: "viewer",
    path: "/featureviewer/:mapType/:layer/:cql_filter",
    component: require('./pages/FeatureViewer')
 }, {
    name: "mapviewer",
    path: "/viewer/:mapType/:mapId",
    component: require('./pages/MapViewer')
}, {
    name: "wmsviewer",
    path: "/wmsfeatureviewer/:mapType/:layer/:cql_filter",
    component: require('./pages/FeatureViewer')
}];
const routerSelector = createSelector(state => state.locale, (locale) => ({
    locale: locale || {},
    version: "no-version",
    themeCfg: {
        theme: "comge"
    },
    pages
}));
const StandardRouter = connect(routerSelector)(require('../MapStore2/web/client/components/app/StandardRouter'));

require('../MapStore2/web/client/product/main')(
    require('./appConfigEmbedded'),
    require('./apiPlugins.js'),
    (cfg) => ({
        ...cfg,
        appComponent: StandardRouter
    })
);
