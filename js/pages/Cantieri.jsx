/*
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
const {initPlugin} = require('../actions/cantieri');
const {loadMapConfig} = require('../../MapStore2/web/client/actions/config');

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
    componentWillMount() {
        var idCantiere = this.props.match.params.idCantiere || 0;
        var typology = this.props.match.params.typology || "cantiere";

        var options = {
            "geoserverUrl": "/geoserver-test/ows",
            "toolbar": {
                "activeTools": ["elementsGrid", "pointSelection"],
                "inactiveTools": ["areasGrid", "polygonSelection"]
            },
            "activeGrid": "elementsGrid",
            "maxFeatures": 1000,
            "checkedElements": [],
            "id": idCantiere,
            "typology": typology,
            "geometry_name": "GEOMETRY",
            "elementsLayerName": "CORSO_1:V_ELEMENTI_CANTIERI",
            "areasLayerName": "CORSO_1:AREE_CANTIERE"
        };
        this.props.loadMapConfig("../config.json", null);
        this.props.initPlugin(options);
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
    reset: resetControls,
    initPlugin,
    loadMapConfig
})(Cantieri);
