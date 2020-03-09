/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const axios = require('../../MapStore2/web/client/libs/ajax');

const urlUtil = require('url');
const assign = require('object-assign');

const {deleteFeaturesByFilter, transaction} = require('../../MapStore2/web/client/utils/ogc/WFST');
const {featureTypeSchema, getTypeName} = require('../../MapStore2/web/client/utils/ogc/WFS/base');

const toData = (response) => {
    if (typeof response.data !== 'object') {
        return JSON.parse(response.data);
    }
    return response.data;
};
const Api = {
    transaction: (baseUrl, operations, describeFeatureType, options) => {
        const parsed = urlUtil.parse(baseUrl, true);
        const url = urlUtil.format(assign({}, parsed, {
            query: assign({
                service: "WFS",
                version: "1.1.0"
            }, parsed.query)
        }));
        const body = transaction(operations, featureTypeSchema(describeFeatureType));
        return axios.post(url, body, assign({headers: { 'Content-Type': 'application/xml'}}, options))
            .then( response => {
                if (typeof response.data === "string") {
                    if (response.data.indexOf("ExceptionReport") > 0) {
                        throw response.data;
                    }
                }
                return response;
            });
    },
    /**
     * Simpler version of describeFeatureType, only json format supported
     * @param  {string} baseUrl         Base ows services url
     * @param  {string} featureTypeName the name of the feature type
     * @param  {Object} [params={}]     Other parameters
     * @param  {object} [options]         Options for the request
     * @return {Promise}                the request promise
     */
    describeFeatureType: (baseUrl, featureTypeName, params = {}, options) => {
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
    },
    deleteByFilter: (baseUrl, filter, describeFeatureType, options) =>
        Api.transaction(baseUrl, [deleteFeaturesByFilter(filter, getTypeName(describeFeatureType))], describeFeatureType, options)
};

module.exports = Api;
