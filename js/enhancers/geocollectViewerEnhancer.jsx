/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Rx = require('rxjs');
const {compose, withProps} = require('recompose');
const propsStreamFactory = require('../../MapStore2/web/client/components/misc/enhancers/propsStreamFactory');
const axios = require('../../MapStore2/web/client/libs/ajax');
const WFSApi = require('../../MapStore2/web/client/api/WFS');

const oneCall = (response, viewerConfig) => {
    return Rx.Observable.defer(function() {
        let baseUrl = viewerConfig.baseUrl;
        const folder = viewerConfig.folder + response.features[0].properties[viewerConfig.featureProperty];
        baseUrl = baseUrl + folder + "/" + response.features[0].id;
        return axios.get(baseUrl);
    }).map((data) => (
        {imgsSegnResponse: data}
    ));
};

const twoCall = (response, viewerConfig) => {

    // Search for Segnalazioni Images
    let baseUrlSegn = viewerConfig.baseUrl;
    const folderSegn = viewerConfig.folder + response.features[0].properties.gcid;
    baseUrlSegn = baseUrlSegn + folderSegn + "/" + response.features[0].id;
    const segnGet = Rx.Observable.defer(() =>
        axios.get(baseUrlSegn)
    );
    const segnRes = segnGet.map((imgsSegnResponse) => (
        imgsSegnResponse
    ));

    // Search for Sopralluoghi
    const url = viewerConfig.wfsUrl;
    const gcid = response.features[0].properties.gcid;
    const cqlFilter = viewerConfig.featureProperty + "=" + gcid;
    const firstGet = Rx.Observable.defer(() =>
        WFSApi.getFeatureSimple(
            url,
            {
                typeName: 'cens_muri_sop',
                cql_filter: cqlFilter,
                sortBy: 'gc_created D'
            }
        )
    );
    const firstRes = firstGet.map((wfsResponse) => (
        wfsResponse
    ));

    // Search for Sopralluoghi Images
    const secondGet = firstRes.flatMap((wfsResponse) => {
        let baseUrl;
        let imgsGets = [];
        if (wfsResponse.features.length > 0) {
            wfsResponse.features.forEach((value) => {
                const folder = viewerConfig.folder + value.properties[viewerConfig.featureProperty];
                baseUrl = viewerConfig.baseUrl;
                baseUrl = baseUrl + folder + "/" + value.id;
                let imgsAxios = axios.get(baseUrl);
                imgsGets.push(imgsAxios);
            });
            return Promise.all(imgsGets);
        }
        return Rx.Observable.of({});
    });
    const secondRes = secondGet.map((imgsSopResponse) => (
        imgsSopResponse
    ));

    return secondRes.zip(segnRes, firstRes, (imgsSopResponse, imgsSegnResponse, wfsResponse) => (
        {
            imgsSegnResponse,
            imgsSopResponse,
            wfsResponse
        }
    ));
};

const dataStreamFactory = ($props) =>
    $props
        .switchMap(
            ({response, layer}) => {
                const id = response.features[0].id;
                const viewerConfig = layer.viewer;

                if (id.split('.')[0] === 'cens_muri') {
                    return twoCall(response, viewerConfig);
                }
                if (id.split('.')[0] === 'cens_muri_sop') {
                    return oneCall(response, viewerConfig);
                }
                return null;
            });

module.exports = compose(
    withProps( () => ({
        dataStreamFactory
    })),
    propsStreamFactory
);
