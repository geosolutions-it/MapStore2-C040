/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import PropTypes  from 'prop-types';
import {connect}  from 'react-redux';
import Page  from '../../MapStore2/web/client/containers/Page';
import {resetControls}  from '../../MapStore2/web/client/actions/controls';
import {loadMaps}  from '../../MapStore2/web/client/actions/maps';
import ConfigUtils  from '../../MapStore2/web/client/utils/ConfigUtils';

import '../../assets/css/custom.css';

class Home extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        mode: PropTypes.string,
        geoStoreUrl: PropTypes.string,
        match: PropTypes.object,
        loadMaps: PropTypes.func,
        reset: PropTypes.func,
        plugins: PropTypes.object,
        pluginsConfig: PropTypes.object
    }
    static contextTypes = {
        router: PropTypes.object
    }
    static defaultProps = {
        name: "maps",
        mode: 'desktop',
        match: {},
        loadMaps: () => {},
        reset: () => {},
        pluginsConfig: {}
    }
    UNSAFE_componentWillMount() {
        this.props.reset();
    }

    render() {
        let plugins = this.props.pluginsConfig;
        let pagePlugins = {
            "desktop": plugins.common || [], // TODO mesh page plugins with other plugins
            "mobile": plugins.common || []
        };
        let pluginsConfig = {
            "desktop": plugins[this.props.name] || [], // TODO mesh page plugins with other plugins
            "mobile": plugins[this.props.name] || []
        };

        return (<Page
            id="maps"
            onMount={this.props.loadMaps}
            pagePluginsConfig={pagePlugins}
            pluginsConfig={pluginsConfig}
            plugins={this.props.plugins}
            params={this.props.match.params}
        />);
    }
}

export default connect((state) => {
    return {
        mode: 'desktop',
        geoStoreUrl: (state.localConfig && state.localConfig.geoStoreUrl) || null,
        pluginsConfig: (state.localConfig && state.localConfig.plugins) || null
    };
}, {
    loadMaps: () => loadMaps(
        ConfigUtils.getDefaults().geoStoreUrl,
        ConfigUtils.getDefaults().initialMapFilter || "*"
    ),
    reset: resetControls
})(Home);
