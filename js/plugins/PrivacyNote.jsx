/**
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const PropTypes = require('prop-types');
const assign = require('object-assign');

const { Button } = require('react-bootstrap');
class PrivacyNote extends React.Component {
    static propTypes = {
        options: PropTypes.object,
        url: PropTypes.string
    }
    static defaultProps = {
        url: 'http://www.comune.genova.it/content/note-legali-e-privacy',
        options: {}
    }

    render() {
        return (<Button bsSize="sm" bsStyle="primary" style={{"float": "right"}} target="_blank" href={this.props.url} {...this.props.options} >Privacy</Button>);
    }
}

module.exports = {
    PrivacyNotePlugin: assign(PrivacyNote, {
        MapFooter: {
            name: 'privacyNote',
            position: 100,
            tool: true,
            priority: 1
        }
    })
};
