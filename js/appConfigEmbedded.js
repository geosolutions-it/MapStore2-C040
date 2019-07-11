/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const {startLoading, updateFeatureLoader} = require('./epics/featureloader');
const {addCustomViewer} = require('./epics/initCustomEditors');

module.exports = {
    mode: 'embedded',
    printingEnabled: false,
    pages: [{
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
     }],
    pluginsDef: require('./apiPlugins'),
    translations: ["MapStore2/web/client/translations", "translations"],
    initialState: {
        defaultState: {
            mousePosition: {enabled: false},
            controls: {
                help: {
                    enabled: false
                },
                print: {
                    enabled: false
                },
                toolbar: {
                    active: null,
                    expanded: false
                },
                drawer: {
                    enabled: false,
                    menu: "1"
                },
                cantieri: {
                    enabled: true
                },
                saveAs: {
                    allowedRoles: ["ADMIN"]
                },
                RefreshLayers: {
                   enabled: false,
                   options: {
                       bbox: true,
                       search: true,
                       title: false,
                       dimensions: false
                   }
               }
            },
            "maptype": {
               "mapType": "openlayers"
            },
            mapInfo: {enabled: true, infoFormat: 'text/html' }
        },
        mobile: {
            mapInfo: {enabled: true, infoFormat: 'text/html' },
            mousePosition: {enabled: true, crs: "EPSG:4326", showCenter: true},
            catalog: {
                format: "wms",
                "supportedFormats": [{"name": "wms", "label": "WMS"}, {"name": "csw", "label": "CSW"}]
            }
        }
    },
    themeCfg: {
        theme: "comge"
    },
    baseReducers: {
        mode: (state = 'embedded') => state,
        maps: require('../MapStore2/web/client/reducers/maps'),
        security: require('../MapStore2/web/client/reducers/security'),
        searchconfig: require('../MapStore2/web/client/reducers/searchconfig')
    },
    initialActions: [],
    baseEpics: {
        "FEATUREVIEWER:startLoading": startLoading,
        "FEATUREVIEWER:updateFeatureLoader": updateFeatureLoader,
        addCustomViewer
    },
    storeOpts: {
        persist: {
            whitelist: ['security']
        }
    }
};
