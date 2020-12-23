/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import PropTypes  from 'prop-types';
import MapViewer  from '../../MapStore2/web/client/product/pages/MapViewer';


class MapViewerPage extends React.Component {
    static propTypes = {
        mode: PropTypes.string,
        match: PropTypes.object,
        loadMapConfig: PropTypes.func,
        reset: PropTypes.func,
        plugins: PropTypes.object,
        location: PropTypes.object
    }
    render() {
        return (<MapViewer
            {...this.props}
            mode="embedded"
        />);
    }
}

export default MapViewerPage;
