/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';

import {connect}  from 'react-redux';

import ConfigUtils  from '@mapstore/utils/ConfigUtils';
import PluginsUtils  from '@mapstore/utils/PluginsUtils';
import PropTypes  from 'prop-types';

const PluginsContainer = connect((state) => ({
    pluginsConfig: state.plugins || ConfigUtils.getConfigProp('plugins') || null,
    mode: "featureviewer",
    pluginsState: state && state.controls || {},
    monitoredState: PluginsUtils.filterState(state, ConfigUtils.getConfigProp('monitorState') || [])
}))(require('@mapstore/components/plugins/PluginsContainer').default);

class MapViewer extends React.Component {
    static propTypes = {
        params: PropTypes.object,
        loadMapConfig: PropTypes.func,
        plugins: PropTypes.object
    }
    static defaultProps = {
        mode: 'featureviewer',
        loadMapConfig: () => {}
    };
    UNSAFE_componentWillMount() {
        this.props.loadMapConfig();
    }
    render() {
        return (<PluginsContainer mode="featureviewer" key="featureviewer" id="featureviewer" className="viewer"
            plugins={this.props.plugins}
            params={this.props.params}
        />);
    }
}

export default MapViewer;
