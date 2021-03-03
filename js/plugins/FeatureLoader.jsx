/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React  from 'react';
import { createPlugin } from '@mapstore/utils/PluginsUtils';
class FeatureLoader extends React.Component {
    render() {
        return <noscript></noscript>;
    }
}

export default createPlugin('FeatureLoader', {
    component: FeatureLoader
});
