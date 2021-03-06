/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React  from 'react';
import {DropdownButton, MenuItem, NavDropdown, Glyphicon}  from 'react-bootstrap';
import Message  from '../../MapStore2/web/client/components/I18N/Message';
import url  from 'url';
import PropTypes  from 'prop-types';
/**
   * A DropDown menu for user details:
   */

class UserMenu extends React.Component {
    static propTypes = {
        // PROPS
        user: PropTypes.object,
        displayName: PropTypes.string,
        showAccountInfo: PropTypes.bool,
        showPasswordChange: PropTypes.bool,
        showLogout: PropTypes.bool,
        /**
        * displayAttributes function to filter attributes to show
        */
        displayAttributes: PropTypes.func,
        bsStyle: PropTypes.string,
        renderButtonText: PropTypes.bool,
        nav: PropTypes.bool,
        menuProps: PropTypes.object,

        // FUNCTIONS
        renderButtonContent: PropTypes.func,
        // CALLBACKS
        onShowAccountInfo: PropTypes.func,
        onShowChangePassword: PropTypes.func,
        onShowLogin: PropTypes.func,
        onLogout: PropTypes.func,
        className: PropTypes.string
    }
    static defaultProps = {
        user: {},
        showAccountInfo: true,
        showPasswordChange: true,
        showLogout: true,
        onLogout: () => {},
        onPasswordChange: () => {},
        displayName: "name",
        bsStyle: "primary",
        displayAttributes: (attr) => {
            return attr.name === "email";
        },
        className: "user-menu",
        menuProps: {
            noCaret: true
        },
        toolsCfg: [{
            buttonSize: "small",
            includeCloseButton: false,
            useModal: false,
            closeGlyph: "1-close"
        }, {
            buttonSize: "small",
            includeCloseButton: false,
            useModal: false,
            closeGlyph: "1-close"
        }, {
            buttonSize: "small",
            includeCloseButton: false,
            useModal: false,
            closeGlyph: "1-close"
        }]
    };


    renderGuestTools = () => {
        let DropDown = this.props.nav ? NavDropdown : DropdownButton;
        const urlQuery = url.parse(window.location.href, true).query;
        return (<DropDown className={this.props.className} pullRight bsStyle={this.props.bsStyle} title={this.renderButtonText()} id="dropdown-basic-primary" {...this.props.menuProps}>
            <MenuItem onSelect={this.props.onShowLogin} disabled={urlQuery.public === "yes"}><Glyphicon glyph="log-in" />login</MenuItem>
        </DropDown>);
    }
    renderLoggedTools = () => {
        let DropDown = this.props.nav ? NavDropdown : DropdownButton;
        let itemArray = [];
        if (this.props.showAccountInfo) {
            itemArray.push(<MenuItem key="accountInfo" onClick={this.props.onShowAccountInfo}> <Glyphicon glyph="user" /><Message msgId="user.info"/></MenuItem>);
        }
        if (this.props.showPasswordChange) {
            itemArray.push(<MenuItem key="passwordChange" onClick={this.props.onShowChangePassword}> <Glyphicon glyph="asterisk" /> <Message msgId="user.changePwd"/></MenuItem>);
        }
        if (this.props.showLogout) {
            if (itemArray.length > 0) {
                itemArray.push(<MenuItem key="divider" divider />);
            }
            itemArray.push(<MenuItem key="logout" onClick={() => this.props.onLogout()}><Glyphicon glyph="log-out" /> <Message msgId="user.logout"/></MenuItem>);
        }
        return (
            <DropDown id="loginButton" className={this.props.className} pullRight bsStyle="success" title={this.renderButtonText()} {...this.props.menuProps} >
                <span key="logged-user"><MenuItem header>{this.props.user.name}</MenuItem></span>
                {itemArray}
            </DropDown>);
    }
    renderButtonText = () => {

        return this.props.renderButtonContent ?
            this.props.renderButtonContent() :
            [<Glyphicon glyph="user" />, this.props.renderButtonText ? this.props.user && this.props.user[this.props.displayName] || "Guest" : null];
    }
    render() {
        return this.props.user && this.props.user[this.props.displayName] ? this.renderLoggedTools() : this.renderGuestTools();
    }
}

export default UserMenu;
