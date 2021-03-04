/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import HTML  from '../../components/I18N/HTML';
import PropTypes  from 'prop-types';
import { createPlugin } from '@mapstore/utils/PluginsUtils';

import './homedescription/homedescription.css';
class HomeDescription extends React.Component {

    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.object
    }
    render() {
        return (
            <div style={this.props.style} className="mapstore-home-description">
                <HTML msgId="home.description" />
            </div>
        );
    }
}

export default createPlugin('HomeDescription', {
    component: HomeDescription
});
