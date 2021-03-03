/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import PropTypes  from 'prop-types';

import src  from '../../assets/img/logo.jpg';
import { createPlugin } from '@mapstore/utils/PluginsUtils';

class Header extends React.Component {
    static propTypes = {
        style: PropTypes.object,
        className: PropTypes.object
    }
    render() {
        return (
            <div style={this.props.style} className="mapstore-header">
            </div>
        );
    }
}

export default createPlugin('Header', {
    component: Header,
    containers: {
        NavMenu: {
            tool: (props) => ({
                position: 0,
                className: "logo-full",
                label: props.label || 'Comune di Genova',
                href: props.href || 'https://smart.comune.genova.it/',
                style: {padding: '0 15px'},
                img: props.src && <img className="logo" src={props.src} /> || <img className="customer-logo" src={src} height="30" />,
                logo: true
            })
        }
    },
    reducers: {}
});
