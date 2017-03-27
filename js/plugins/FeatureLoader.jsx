/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');

const FeatureLoader = React.createClass({
    render() {
        return <noscript></noscript>;
    }
});

module.exports = {
    FeatureLoaderPlugin: FeatureLoader,
    epics: {
        startLoading: require('../epics/featureloader').startLoading
    }
};
