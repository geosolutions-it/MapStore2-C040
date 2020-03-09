/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const assign = require('object-assign');
const PropTypes = require('prop-types');
const React = require('react');
const {connect} = require('react-redux');

const Page = require('../../MapStore2/web/client/containers/Page');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');
const {loadMapConfig} = require('../../MapStore2/web/client/actions/config');
const axios = require('../../MapStore2/web/client/libs/ajax');

const {initPlugin} = require('../actions/cantieri');
require('../../assets/css/custom.css');

class Cantieri extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        mode: PropTypes.string,
        geoStoreUrl: PropTypes.string,
        loadMapConfig: PropTypes.func,
        match: PropTypes.object,
        initPlugin: PropTypes.func,
        reset: PropTypes.func,
        plugins: PropTypes.object,
        pluginsConfig: PropTypes.object
    }
    static contextTypes = {
        router: PropTypes.object
    }
    static defaultProps = {
        name: "cantieri",
        mode: 'desktop',
        match: {},
        initPlugin: () => {},
        reset: () => {},
        pluginsConfig: {}
    }
    UNSAFE_componentWillMount() {
        var id = this.props.match.params.idCantiere || 0;
        var typology = this.props.match.params.typology || "cantiere";

        axios.get("configs/llppConfig.json").then(res => {
            let options = assign({}, res.data, {
                id,
                typology
            });
            this.props.initPlugin(options);
            this.props.loadMapConfig("configs/cantieriMapConfig.json", null);
        });


    }
    componentDidMount() {
        this.props.reset();
    }
    render() {
        let plugins = this.props.pluginsConfig;
        let pluginsConfig = {
            "desktop": plugins[this.props.name] || [], // TODO mesh page plugins with other plugins
            "mobile": plugins[this.props.name] || []
        };

        return (<Page
            id="cantieri"
            includeCommon={false}
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
    reset: resetControls.bind(null, ["cantieri"]),
    initPlugin,
    loadMapConfig
})(Cantieri);
