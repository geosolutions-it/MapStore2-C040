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
const PropTypes = require('prop-types');

const url = require('url');
const urlQuery = url.parse(window.location.href, true).query;

const ConfigUtils = require('../../MapStore2/web/client/utils/ConfigUtils');
const {loadMapConfig} = require('../../MapStore2/web/client/actions/config');
const MapViewerCmp = require('../../MapStore2/web/client/product/components/viewer/MapViewerCmp');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');
const {initMap} = require('../../MapStore2/web/client/actions/map');

const MapViewerContainer = require('../../MapStore2/web/client/containers/MapViewer');
let oldLocation;
class MapViewerPage extends React.Component {
    static propTypes = {
        mode: PropTypes.string,
        match: PropTypes.object,
        loadMapConfig: PropTypes.func,
        onInit: PropTypes.func,
        reset: PropTypes.func,
        plugins: PropTypes.object,
        wrappedContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        location: PropTypes.object
    };
    static defaultProps = {
        match: {},
        mode: 'desktop',
        wrappedContainer: MapViewerContainer
    };
    UNSAFE_componentWillMount() {
        if (this.props.match.params.mapId && oldLocation !== this.props.location) {
            oldLocation = this.props.location;
            if (!ConfigUtils.getDefaults().ignoreMobileCss) {
                if (this.props.mode === 'mobile') {
                    require('../../MapStore2/web/client/product/assets/css/mobile.css');
                }
            }
            this.props.reset();
        }
    }
    render() {
        return (<MapViewerCmp
            plugins={this.props.plugins}
            params={this.props.match.params}
            {...this.props}
        />);
    }
}

module.exports = connect((state) => ({
    mode: (urlQuery.mobile || (state.browser && state.browser.mobile)) ? 'mobile' : 'desktop'
}),
{
    loadMapConfig,
    onInit: initMap,
    reset: resetControls
}, (state, dispatch, own) => {
    return {
        ...state,
        ...dispatch,
        ...own
    };
})(MapViewerPage);
