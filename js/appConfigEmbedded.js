/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
import {startLoading, updateFeatureLoader} from '@js/epics/featureloader';
import {addCustomViewer} from '@js/epics/initCustomEditors';

import Embedded from '@js/pages/Embedded';
import FeatureViewer from '@js/pages/FeatureViewer';
import MapViewer from '@mapstore/product/pages/MapViewer';
import maps from '@mapstore/reducers/maps';
import security from '@mapstore/reducers/security';
import searchconfig from '@mapstore/reducers/searchconfig';

import pluginsDef from '@js/apiPlugins';

export default {
    mode: 'embedded',
    printingEnabled: false,
    pages: [{
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
    }],
    pluginsDef,
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
        maps,
        security,
        searchconfig
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
