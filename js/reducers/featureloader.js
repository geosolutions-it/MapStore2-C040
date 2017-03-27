/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

var { STARTLOADING } = require('../actions/featureloader');
var assign = require('object-assign');

function browser(state = null, action) {
    switch (action.type) {
        case STARTLOADING: {
            return assign({}, state,
                {
                    layer: action.layer,
                    cql_filter: action.cql_filter
                }
                );
        }
        default:
            return state;
    }
}

module.exports = browser;
