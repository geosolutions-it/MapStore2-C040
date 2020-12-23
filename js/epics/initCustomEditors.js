/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Rx  from 'rxjs';
import React  from 'react';
import { MAP_CONFIG_LOADED }  from '@mapstore/actions/config';
import { register, clean }  from '@mapstore/utils/featuregrid/EditorRegistry';
import AddressesEditor  from '../components/AddressesEditor';
import * as MapInfoUtils  from '@mapstore/utils/MapInfoUtils';
import geocollectViewerEnhancer  from '../enhancers/geocollectViewerEnhancer';
import GeocollectViewer  from '../viewer/GeocollectViewer';

const editors = {
    "AddressesEditor": {
        "string": (props) => <AddressesEditor dataType="string" {...props}/>
    }
};


/**
* addCustomEditors epic
* it extends the list of custom editors used in the feature grid editing
* and fetched by some regex rule placed in the localconfig - FeatureEditor
*/

export const addCustomEditors = (action$) =>
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
        });
export const addCustomViewer = (action$) =>
    action$.ofType(MAP_CONFIG_LOADED)
        .switchMap(() => {
            MapInfoUtils.setViewer("Geocollect", geocollectViewerEnhancer(GeocollectViewer));
            return Rx.Observable.empty();
        });


export default {
    addCustomEditors,
    addCustomViewer
};
