/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const PropTypes = require('prop-types');
require('../../MapStore2/web/client/product/assets/css/viewer.css');

const {connect} = require('react-redux');
const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');
const {loadMapConfig} = require('../../MapStore2/web/client/actions/config');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');
const {startFeatureLoader, updateFeatureLoader} = require('../actions/featureloader');

const MapViewer = require('../containers/FeatureViewer');
const isWmsViewer = path => path.indexOf("/wmsfeatureviewer") !== -1;

class MapViewerPage extends React.Component {
    static propTypes = {
        mode: PropTypes.string,
        match: PropTypes.object,
        onMount: PropTypes.func,
        onUpdate: PropTypes.func,
        reset: PropTypes.func,
        plugins: PropTypes.object
    }
    static defaultProps = {
        mode: 'featureviewer',
        match: {},
        onMount: () => {},
        onUpdate: () => {}
    };

    UNSAFE_componentWillMount() {
        this.props.onMount(ConfigUtils.getConfigProp("wmsURL"), this.props.match.params, "config.json", isWmsViewer(this.props.match.path));
        if (!ConfigUtils.getDefaults().ignoreMobileCss) {
            if (this.props.mode === 'mobile') {
                require('../../MapStore2/web/client/product/assets/css/mobile.css');
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params !== prevProps.params) {
            this.props.onUpdate(prevProps, this.props.match.params, ConfigUtils.getConfigProp("wmsURL"), isWmsViewer(this.props.match.path));
        }
    }
    render() {
        return (<MapViewer
            mode={this.props.mode}
            plugins={this.props.plugins}
        />);
    }
}

module.exports = connect(() => ({
}),
{
    loadMapConfig,
    onMount: startFeatureLoader,
    onUpdate: updateFeatureLoader,
    reset: resetControls
})(MapViewerPage);
