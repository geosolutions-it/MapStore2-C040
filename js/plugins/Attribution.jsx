/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const src = require("../../assets/img/logo.jpg");
const PropTypes = require('prop-types');

class Attribution extends React.Component {
    static propTypes = {
        src: PropTypes.string,
        style: PropTypes.object
    }
    static defaultProps = {
        src: src,
        style: {
            position: "absolute",
            width: "124px",
            left: "calc(50% - 62px)",
            bottom: "35px"
        }
    }

    render() {

        return (<img
            src={this.props.src}
            style={this.props.style} />);
    }
}

module.exports = {
    AttributionPlugin: Attribution
};
