/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const PropTypes = require('prop-types');
const {connect} = require('react-redux');
const Page = require('../../MapStore2/web/client/containers/Page');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');

require('../../assets/css/custom.css');

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
    componentDidMount() {
        this.props.reset();
        this.props.loadMaps(this.props.geoStoreUrl);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.geoStoreUrl !== nextProps.geoStoreUrl) {
            this.props.loadMaps(nextProps.geoStoreUrl);
        }
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
            pagePluginsConfig={pagePlugins}
            pluginsConfig={pluginsConfig}
            plugins={this.props.plugins}
            params={this.props.match.params}
        />);
    }
}

module.exports = connect((state) => {
    return {
        mode: 'desktop',
        geoStoreUrl: (state.localConfig && state.localConfig.geoStoreUrl) || null,
        pluginsConfig: (state.localConfig && state.localConfig.plugins) || null
    };
}, {
    reset: resetControls
})(Home);
