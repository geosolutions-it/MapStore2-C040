/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');
const {createSelector} = require('reselect');
const {startLoading, updateFeatureLoader} = require('./epics/featureloader');
const LocaleUtils = require('../MapStore2/web/client/utils/LocaleUtils');
const ConfigUtils = require('../MapStore2/web/client/utils/ConfigUtils');
const {addCustomEditors, addCustomViewer} = require('./epics/initCustomEditors');
const {loadMaps} = require('../MapStore2/web/client/actions/maps');
const {loadVersion} = require('../MapStore2/web/client/actions/version');
const {versionSelector} = require('../MapStore2/web/client/selectors/version');
const {loadAfterThemeSelector} = require('../MapStore2/web/client/selectors/config');

const startApp = () => {
    const StandardApp = require('../MapStore2/web/client/components/app/StandardApp');
    const {pages, pluginsDef, initialState, storeOpts, printingEnabled} = require('./appConfig');
    const routerSelector = createSelector(
        state => state.locale || {},
        state => versionSelector(state),
        state => loadAfterThemeSelector(state),
        (locale, version, loadAfterTheme) => ({
            locale,
            pages,
            themeCfg: {
                theme: "comge"
            },
            version,
            loadAfterTheme
    }));
    const StandardRouter = connect(routerSelector)(require('../MapStore2/web/client/components/app/StandardRouter'));
    const {updateMapLayoutEpic} = require('../MapStore2/web/client/epics/maplayout');
    const {readQueryParamsOnMapEpic} = require('../MapStore2/web/client/epics/share');
    const appStore = require('../MapStore2/web/client/stores/StandardStore').bind(null, initialState, {
        maps: require('../MapStore2/web/client/reducers/maps'),
        security: require('../MapStore2/web/client/reducers/security'),
        maplayout: require('../MapStore2/web/client/reducers/maplayout'),
        version: require('../MapStore2/web/client/reducers/version')
    }, {
        "FEATUREVIEWER:startLoading": startLoading,
        "FEATUREVIEWER:updateFeatureLoader": updateFeatureLoader,
        addCustomEditors,
        addCustomViewer,
        updateMapLayoutEpic,
        readQueryParamsOnMapEpic
    });
    const initialActions = [
        () => loadMaps(
            ConfigUtils.getDefaults().geoStoreUrl,
            ConfigUtils.getDefaults().initialMapFilter || "*"
        ),
        loadVersion
    ];
    const appConfig = {
        appStore,
        storeOpts,
        pluginsDef,
        initialActions,
        appComponent: StandardRouter,
        printingEnabled,
        themeCfg: {
            theme: "comge"
        }
    };
    ReactDOM.render(
        <StandardApp {...appConfig}/>,
        document.getElementById('container')
    );
};
if (!global.Intl ) {
    // Ensure Intl is loaded, then call the given callback
    LocaleUtils.ensureIntl(startApp);
}else {
    startApp();
}
