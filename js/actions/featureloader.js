/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const STARTLOADING = "FEATURELOADER::STARTLOADING";
export const UPDATE = "FEATURELOADER::UPDATE";

export const startFeatureLoader = (wmsURL, params = {}, configURL, isWmsViewer = false) => ({
    type: STARTLOADING,
    wmsURL,
    layer: params.layer,
    cql_filter: params.cql_filter,
    configURL,
    isWmsViewer
});
export const updateFeatureLoader = (oldParams = {}, params = {}, wmsURL, isWmsViewer = false) => ({
    type: UPDATE,
    layer: params.layer,
    cql_filter: params.cql_filter,
    oldParams,
    wmsURL,
    isWmsViewer
});

export default {
    /**
     * start loading the features
     */
    startFeatureLoader,
    updateFeatureLoader,
    STARTLOADING,
    UPDATE
};
