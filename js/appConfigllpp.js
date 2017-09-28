/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    printingEnabled: false,
    pages: [{
        name: "embedviewer",
        path: "/:mapId",
        component: require('./pages/Embedded')
    }, {
        name: "llpp",
        path: "/:typology/:idCantiere",
        component: require('./pages/Cantieri')
    }],
    pluginsDef: require('./llppPlugins'),
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
    storeOpts: {
        persist: {
            whitelist: ['security']
        }
    }
};
