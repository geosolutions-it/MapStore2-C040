/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    printingEnabled: true,
     pages: [{
         name: "home",
         path: "/",
         component: require('./pages/Home')
     }, {
         name: "viewer",
         path: "/viewer",
         component: require('./pages/MapViewer')
     }, {
         name: "viewer",
         path: "/featureviewer/:mapType/:layer/:cql_filter",
         component: require('./pages/FeatureViewer')
     }, {
         name: "mapviewer",
         path: "/viewer/:mapType/:mapId",
         component: require('./pages/MapViewer')
     }, {
         name: "manager",
         path: "/manager",
         component: require('./pages/Manager')
     }, {
         name: "manager",
         path: "/manager/:tool",
         component: require('./pages/Manager')
     }],
     pluginsDef: require('./plugins.js'),
     initialState: {
         defaultState: {
             mousePosition: {enabled: true, "crs": "EPSG:4326"},
             controls: {
                 styler: {
                     enabled: true
                 },
                 help: {
                     enabled: false
                 },
                 print: {
                     enabled: true
                 },
                 toolbar: {
                     active: null,
                     expanded: false
                 },
                 drawer: {
                     enabled: false,
                     menu: "1"
                 },
                 saveAs: {
                     allowedRoles: ["ADMIN"]
                 }
             },
             "maps": {
                     "mapType": "leaflet"
             },
             catalog: {
                 format: "wms",
                 "supportedFormats": [{"name": "wms", "label": "WMS"}, {"name": "csw", "label": "CSW"}]
             }
         },
         mobile: {
             mapInfo: {enabled: true, infoFormat: 'text/html' },
             mousePosition: {enabled: true, crs: "EPSG:4326", showCenter: true},
             "maps": {
                     "mapType": "leaflet"
             },
             "home": {
                     "mapType": "leaflet"
             },
             catalog: {
                 format: "wms",
                 "supportedFormats": [{"name": "wms", "label": "WMS"}, {"name": "csw", "label": "CSW"}]
             }
         }
     },
     storeOpts: {
         persist: {
             whitelist: ['security']
         }
     }
 };
