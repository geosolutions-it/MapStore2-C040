/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const STARTLOADING = "FEATURELOADER::STARTLOADING";
module.exports = {
    /**
     * start loading the features
     */
    startFeatureLoader: (params = {}) => ({
        type: STARTLOADING,
        layer: params.layer,
        cql_filter: params.cql_filter
    }),
    STARTLOADING
};
