/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
import { startLoading, updateFeatureLoader } from '@js/epics/featureloader';
import { addCustomEditors, addCustomViewer } from '@js/epics/initCustomEditors';
import Home from '@js/pages/Home';
import MapViewer from '@mapstore/product/pages/MapViewer';
import FeatureViewer from '@js/pages/FeatureViewer';
import Context from '@mapstore/product/pages/Context';
import ContextCreator from '@mapstore/product/pages/ContextCreator';
import Manager from '@js/pages/Manager';
import ContextManager from '@mapstore/product/pages/ContextManager';
import Dashboard from '@mapstore/product/pages/Dashboard';
import RulesManager from '@mapstore/product/pages/RulesManager';
import GeoStory from '@mapstore/product/pages/GeoStory';

import security from '@mapstore/reducers/security';

import pluginsDef from '@js/plugins.js';

export default {
    printingEnabled: true,
    pages: [{
        name: "home",
        path: "/",
        component: Home
    }, {
        name: "viewer",
        path: "/viewer",
        component: MapViewer
    }, {
        name: "featureviewer",
        path: "/featureviewer/:mapType/:layer/:cql_filter",
        component: FeatureViewer
    }, {
        name: "wmsviewer",
        path: "/wmsfeatureviewer/:mapType/:layer/:cql_filter",
        component: FeatureViewer
    }, {
        name: "mapviewer",
        path: "/viewer/:mapType/:mapId",
        component: MapViewer
    }, {
        name: "mapviewer",
        path: "/viewer/:mapId",
        component: MapViewer
    }, {
        name: "mapviewer",
        path: "/viewer/:mapType/:mapId/context/:contextId", // TODO CHECK
        component: MapViewer // IF IT IS NEEDED TO USE MAPSTORE PAGE
    }, {
        name: 'context',
        path: "/context/:contextName",
        component: Context
    }, {
        name: 'context',
        path: "/context/:contextName/:mapId",
        component: Context
    }, {
        name: 'context-creator',
        path: "/context-creator/:contextId",
        component: ContextCreator
    }, {
        name: "manager",
        path: "/manager",
        component: Manager
    }, {
        name: "manager",
        path: "/manager/:tool",
        component: Manager
    }, {
        name: "context-manager",
        path: "/context-manager",
        component: ContextManager
    }, {
        name: "dashboard",
        path: "/dashboard",
        component: Dashboard
    }, {
        name: "dashboard",
        path: "/dashboard/:did",
        component: Dashboard
    }, {
        name: "rulesmanager",
        path: "/rules-manager",
        component: RulesManager
    }, {
        name: "geostory",
        path: "/geostory/:gid",
        component: GeoStory
    }, {
        name: "geostory",
        path: "/geostory/shared/:gid",
        component: GeoStory
    }],
    pluginsDef,
    initialState: {
        defaultState: {
            mapInfo: {enabled: true, infoFormat: 'text/html'},
            mousePosition: {enabled: false, "crs": "EPSG:4326"},
            controls: {
                styler: {
                    enabled: true
                },
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
            maps: {
                mapType: "openlayers"
            },
            maptype: {
                mapType: "openlayers"
            },
            catalog: {
                format: "wms",
                "supportedFormats": [{"name": "wms", "label": "WMS"}, {"name": "csw", "label": "CSW"}]
            }
        },
        mobile: {
            mapInfo: {enabled: true, infoFormat: 'text/html' },
            mousePosition: {enabled: false, crs: "EPSG:4326", showCenter: true},
            "maps": {
                "mapType": "openlayers"
            },
            "maptype": {
                "mapType": "openlayers"
            },
            catalog: {
                format: "wms",
                "supportedFormats": [{"name": "wms", "label": "WMS"}, {"name": "csw", "label": "CSW"}]
            }
        }
    },
    themeCfg: {
        theme: "comge"
    },
    appReducers: {
        security
    },
    appEpics: {
        "FEATUREVIEWER:startLoading": startLoading,
        "FEATUREVIEWER:updateFeatureLoader": updateFeatureLoader,
        addCustomEditors,
        addCustomViewer
    },
    storeOpts: {
        persist: {
            whitelist: ['security']
        }
    }
};
