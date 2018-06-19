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

const GeoNetworkLinkMenuItem = ({
    href = 'http://mappe.comune.genova.it/geonetwork/srv/eng/main.home',
    target = '_blank',
    glyph = 'link'
}) => (
    <MenuItem href={href} target={target}>
        <Glyphicon glyph={glyph}/><Message msgId="geoNetworkLink"/>
    </MenuItem>
);

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
