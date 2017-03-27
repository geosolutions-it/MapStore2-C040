/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

require('../../MapStore2/web/client/product/assets/css/viewer.css');

const {connect} = require('react-redux');

const {loadMapConfig} = require('../../MapStore2/web/client/actions/config');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');
const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');
const {startFeatureLoader} = require('../actions/featureloader');
const MapViewer = require('../../MapStore2/web/client/containers/FeatureViewer');

const MapViewerPage = React.createClass({
    propTypes: {
        mode: React.PropTypes.string,
        params: React.PropTypes.object,
        onMount: React.PropTypes.func,
        reset: React.PropTypes.func,
        plugins: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            mode: 'featureviewer',
            onMount: () => {}
        };
    },
    componentWillMount() {
        this.props.onMount(ConfigUtils.getConfigProp("wmsURL"), this.props.params);
    },
    render() {
        return (<MapViewer
            mode={this.props.mode}
            params={this.props.params}
            plugins={this.props.plugins}
            />);
    }
});

module.exports = connect(() => ({
}),
{
    loadMapConfig,
    onMount: startFeatureLoader,
    reset: resetControls
})(MapViewerPage);
