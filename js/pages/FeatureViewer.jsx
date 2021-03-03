/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import PropTypes  from 'prop-types';
import '@mapstore/product/assets/css/viewer.css';

import {connect}  from 'react-redux';
import ConfigUtils  from '@mapstore/utils/ConfigUtils';
import {loadMapConfig}  from '@mapstore/actions/config';
import {resetControls}  from '@mapstore/actions/controls';
import {startFeatureLoader, updateFeatureLoader}  from '../actions/featureloader';

import MapViewer  from '../containers/FeatureViewer';
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

export default connect(() => ({
}),
{
    loadMapConfig,
    onMount: startFeatureLoader,
    onUpdate: updateFeatureLoader,
    reset: resetControls
})(MapViewerPage);
