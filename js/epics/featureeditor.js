/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Rx = require('rxjs');
const React = require('react');
const { MAP_CONFIG_LOADED } = require('../../MapStore2/web/client/actions/config');
const { register, clean } = require('../../MapStore2/web/client/utils/featuregrid/EditorRegistry');
const IndirizziEditor = require('../components/IndirizziEditor');

const editors = {
    "IndirizziEditor": {
        "string": (props) => <IndirizziEditor dataType="string" {...props}/>
    }
};


/**
* addCustomEditors epic
* it extends the list of custom editors used in the feature grid editing
* and fetched by some regex rule placed in the localconfig - FeatureEditor
*/
module.exports = {
    addCustomEditors: (action$) =>
        action$.ofType(MAP_CONFIG_LOADED)
        .switchMap(() => {
            clean();
            Object.keys(editors).forEach(ed => {
                register({
                    name: ed,
                    editors: editors[ed]
                });
            });
            return Rx.Observable.empty();
        })
};
