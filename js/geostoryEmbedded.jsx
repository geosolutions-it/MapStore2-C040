/**
 * Copyright 2021, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    setConfigProp,
    setLocalConfigurationFile
} from '@mapstore/utils/ConfigUtils';
/**
 * Add custom (overriding) translations with:
 *
 */
setConfigProp('translationsPath', ['./MapStore2/web/client/translations', './translations']);

/**
 * Use a custom plugins configuration file with:
 *
 */
setLocalConfigurationFile('localConfig.json');


import { loadVersion } from '../MapStore2/web/client/actions/version';

import appConfigGeostoryEmbedded from '../MapStore2/web/client/product/appConfigGeostoryEmbedded';
import pluginsEmbedded from '../MapStore2/web/client/product/pluginsDashboardEmbedded';

import main from '../MapStore2/web/client/product/main';
import { checkForMissingPlugins } from '../MapStore2/web/client/utils/DebugUtils';
checkForMissingPlugins(pluginsEmbedded.plugins);

main(
    {
        ...appConfigGeostoryEmbedded,
        themeCfg: {
            theme: "comge"
        }
    },
    pluginsEmbedded,
    (cfg) => ({
        ...cfg,
        initialActions: [loadVersion]
    })
);

