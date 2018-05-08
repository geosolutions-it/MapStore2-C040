/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = require('react');
const src = require('../../assets/img/logo.jpg');
var assign = require('object-assign');
var Header = React.createClass({
    propTypes: {
        style: React.PropTypes.object,
        className: React.PropTypes.object
    },
    render() {
        return (
            <div style={this.props.style} className="mapstore-header">
                <div className="logo" />
            </div>
        );
    }
});

module.exports = {
    HeaderPlugin: assign(Header, {
        NavMenu: {
            tool: (props) => ({
                position: 0,
                className: "logo-full",
                label: props.label || 'Comune di Genova',
                href: props.href || 'https://www.comune.genova.it/',
                style: {padding: '0 15px'},
                img: props.src && <img className="logo" src={props.src} /> || <img className="customer-logo" src={src} height="30" />,
                logo: true
            })
        }
    })
};
