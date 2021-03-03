/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from '@mapstore/libs/ajax';

import urlUtil from 'url';
import assign from 'object-assign';

import { deleteFeaturesByFilter, transaction as transactionWFST } from '@mapstore/utils/ogc/WFST';
import { featureTypeSchema, getTypeName } from '@mapstore/utils/ogc/WFS/base';

const toData = (response) => {
    if (typeof response.data !== 'object') {
        return JSON.parse(response.data);
    }
    return response.data;
};

export const transaction = (baseUrl, operations, describeFeatureType, options) => {
    const parsed = urlUtil.parse(baseUrl, true);
    const url = urlUtil.format(assign({}, parsed, {
        query: assign({
            service: "WFS",
            version: "1.1.0"
        }, parsed.query)
    }));
    const body = transactionWFST(operations, featureTypeSchema(describeFeatureType));
    return axios.post(url, body, assign({headers: { 'Content-Type': 'application/xml'}}, options))
        .then( response => {
            if (typeof response.data === "string") {
                if (response.data.indexOf("ExceptionReport") > 0) {
                    throw response.data;
                }
            }
            return response;
        });
};
/**
 * Simpler version of describeFeatureType, only json format supported
 * @param  {string} baseUrl         Base ows services url
 * @param  {string} featureTypeName the name of the feature type
 * @param  {Object} [params={}]     Other parameters
 * @param  {object} [options]         Options for the request
 * @return {Promise}                the request promise
 */
export const describeFeatureType = (baseUrl, featureTypeName, params = {}, options) => {
    const parsed = urlUtil.parse(baseUrl, true);
    const url = urlUtil.format(assign({}, parsed, {
        query: assign({
            service: "WFS",
            version: "1.1.0",
            request: "DescribeFeatureType",
            typeName: featureTypeName,
            outputFormat: "application/json"
        }, parsed.query, params)
    }));
    return axios.get(url, options).then(toData);
};
export const deleteByFilter = (baseUrl, filter, describeFeatureTypeParam, options) =>
    transaction(baseUrl, [deleteFeaturesByFilter(filter, getTypeName(describeFeatureTypeParam))], describeFeatureTypeParam, options);


export default {
    transaction,
    describeFeatureType,
    deleteByFilter
};
