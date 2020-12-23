/**
 * Copyright 2016, GeoSolutions Sas.
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
import ConfigUtils  from '../../MapStore2/web/client/utils/ConfigUtils';

class Home extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        mode: PropTypes.string,
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
        name: "manager",
        match: {},
        mode: 'desktop',
        loadMaps: () => {},
        reset: () => {},
        pluginsConfig: {}
    }
    componentDidMount() {
        this.props.reset();
        this.props.loadMaps(ConfigUtils.getDefaults().geoStoreUrl);
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
            id="page-manager"
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
        pluginsConfig: (state.localConfig && state.localConfig.plugins) || ConfigUtils.getConfigProp('plugins') || null
    };
}, {
    reset: resetControls
})(Home);
