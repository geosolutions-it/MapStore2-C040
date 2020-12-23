/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React  from  'react';
import {connect}  from  'react-redux';
import {bindActionCreators}  from  'redux';

import assign  from  'object-assign';

import {changeMapView}  from  '../../MapStore2/web/client/actions/map';


const mapType = "openlayers";
const WMap = require('../../MapStore2/web/client/components/map/' + mapType + '/Map').default;
const Layer = require('../../MapStore2/web/client/components/map/' + mapType + '/Layer').default;
require('../../MapStore2/web/client/components/map/' + mapType + '/plugins/index');

const MapPlugin = (props) => {
    return props.map ?
        (
            <WMap {...props.map} {...props.actions}>
                {props.layers.map((layer, index) =>
                    <Layer key={layer.name} position={index} type={layer.type}
                        options={assign({}, layer, {srs: props.map.projection})}/>
                )}
            </WMap>
        ) : <span/>;
};

export default connect((state) => {
    return {
        map: (state.map && state.map) || (state.config && state.config.map),
        layers: state.config && state.config.layers || []
    };
}, dispatch => {
    return {
        actions: bindActionCreators({
            onMapViewChanges: changeMapView
        }, dispatch)
    };
})(MapPlugin);
