/*
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const assign = require('object-assign');
const {Glyphicon, MenuItem} = require('react-bootstrap');
const Message = require('../../MapStore2/web/client/components/I18N/Message');
const geonetwork = require('../../assets/img/geonetwork.svg');

const GeoNetworkLinkMenuItem = ({
    href = '/geonetwork/srv/ita/main.home',
    target = '_blank',
    glyph = '',
    iconStyle = {}
}) => (
    <MenuItem href={href} target={target}>
        {glyph ? <Glyphicon glyph={glyph}/> : <img style={{...iconStyle, width: 'auto', height: 16, marginRight: 15}} src={geonetwork}/>}
        <Message msgId="geoNetworkLink"/>
    </MenuItem>
);

/**
 * GeoNetworkLink link to GeoNetwork page
 * @prop {string} cfg.href target url
 * @prop {string} cfg.target href target
 * @prop {string} cfg.glyph if glyph is defined it will render instead of GeoNetwork icon
 * @prop {object} cfg.iconStyle style for GeoNetwork icon
 * @memberof plugins
 * @class GeoNetworkLink
 */
module.exports = {
    GeoNetworkLinkPlugin: assign(class extends React.Component {
        render() {
            return null;
        }
    }, {
        BurgerMenu: {
            name: 'geonetwork-link',
            position: 2000,
            text: <Message msgId="geoNetworkLink"/>,
            tool: GeoNetworkLinkMenuItem,
            priority: 2,
            doNotHide: true
        }
    }),
    reducers: {}
};
