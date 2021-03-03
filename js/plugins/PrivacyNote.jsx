/**
 * Copyright 2018, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import PropTypes  from 'prop-types';

import { Button } from 'react-bootstrap';
import { createPlugin } from '@mapstore/utils/PluginsUtils';
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

export default createPlugin('PrivacyNote', {
    component: PrivacyNote,
    containers: {
        MapFooter: {
            name: 'privacyNote',
            position: 100,
            tool: true,
            priority: 1
        }
    }
});
