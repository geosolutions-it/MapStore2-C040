/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MapStore2JSAPI from '@mapstore/jsapi/MapStore2';
import apiPlugins from '@js/apiPlugins';
import appConfigEmbedded from '@js/appConfigEmbedded';

const getScriptPath = () => {
    const scriptEl = document.getElementById('ms2-api');
    return scriptEl && scriptEl.src && scriptEl.src.substring(0, scriptEl.src.lastIndexOf('/')) || 'https://dev.mapstore2.geo-solutions.it/mapstore/dist';
};

const MapStore2 = MapStore2JSAPI
    .withPlugins(apiPlugins, {
        theme: {
            theme: 'comge',
            path: getScriptPath() + '/themes'
        },
        noLocalConfig: true,
        initialState: appConfigEmbedded.initialState,
        translations: appConfigEmbedded.translations
    });
window.MapStore2 = MapStore2;
