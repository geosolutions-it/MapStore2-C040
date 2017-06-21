/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const assign = require('object-assign');
const {Glyphicon} = require('react-bootstrap');
const {UserDetails, PasswordReset, Login } = require('../../MapStore2/web/client/plugins/login/index');
const {refreshTokenEpic} = require('../../MapStore2/web/client/epics/login');

const {connect} = require('../../MapStore2/web/client/utils/PluginsUtils');
const {setControlProperty} = require('../../MapStore2/web/client/actions/controls');
const {logoutWithReload} = require('../../MapStore2/web/client/actions/security');

require('../../MapStore2/web/client/plugins/login/login.css');
/**
  * Login Plugin. Allow to login/logout or show user info and reset password tools
  * @class Login
  * @memberof plugins
  * @static
  *
  * @prop {string} cfg.id identifier of the Plugin, by default `"mapstore-login-menu"`
  * @prop {object} cfg.menuStyle inline style for the menu, by defualt:
  * ```
  * menuStyle: {
  *      zIndex: 30
  * }
  *```
  */

const UserMenu = connect((state) => ({
  user: state.security && state.security.user
}), {
  onShowLogin: setControlProperty.bind(null, "LoginForm", "enabled", true, true),
  onShowAccountInfo: setControlProperty.bind(null, "AccountInfo", "enabled", true, true),
  onShowChangePassword: setControlProperty.bind(null, "ResetPassword", "enabled", true, true),
  onLogout: logoutWithReload
})(require('../components/UserMenu'));

const LoginNav = connect((state) => ({
    user: state.security && state.security.user,
    nav: false,
    renderButtonText: false,
    renderButtonContent: () => {return <Glyphicon glyph="user" />; },
    bsStyle: "primary",
    className: "square-button"
}), {
    onShowLogin: setControlProperty.bind(null, "LoginForm", "enabled", true, true),
    onShowAccountInfo: setControlProperty.bind(null, "AccountInfo", "enabled", true, true),
    onShowChangePassword: setControlProperty.bind(null, "ResetPassword", "enabled", true, true),
    onLogout: logoutWithReload
})(require('../components/UserMenu'));

const LoginTool = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        menuStyle: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            id: "mapstore-login-menu",
            menuStyle: {
                zIndex: 30
            }
        };
    },
    render() {
        return (<div id={this.props.id}>
            <div style={this.props.menuStyle}>
                <UserMenu />
            </div>
            <UserDetails />
            <PasswordReset />
            <Login />
        </div>);
    }
});
module.exports = {
    LoginPlugin: assign(LoginTool, {
        OmniBar: {
            name: "login",
            position: 3,
            tool: LoginNav,
            tools: [UserDetails, PasswordReset, Login],
            priority: 1
        }
    }),
    reducers: {security: require('../../MapStore2/web/client/reducers/security')},
    epics: {
        refreshTokenEpic
    }
};
