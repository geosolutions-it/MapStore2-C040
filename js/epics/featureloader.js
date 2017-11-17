/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const {STARTLOADING, UPDATE, startFeatureLoader} = require('../actions/featureloader');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');
const {zoomToExtent} = require('../../MapStore2/web/client/actions/map');
const {configureMap, configureError} = require('../../MapStore2/web/client/actions/config');
const {addLayer, removeLayer} = require('../../MapStore2/web/client/actions/layers');
const Rx = require('rxjs');
const axios = require('../../MapStore2/web/client/libs/ajax');
const bbox = require('@turf/bbox');

const WMS_ID = "FEATURE_SELECTOR_WMS";
const WFS_ID = "FEATURE_SELECTOR_WFS";

module.exports = {
        startLoading: ( action$ ) =>
            action$.ofType(STARTLOADING)
                .switchMap( (action) =>
                    Rx.Observable.of(resetControls())
                        .concat(
                            action.configURL ? axios.get("config.json")
                                .then( (response) => {
                                    if (typeof response.data === 'object') {
                                        return configureMap(response.data);
                                    }
                                }) : Rx.Observable.empty() )
                        .concat(
                            Rx.Observable.defer(() => axios.get( `${action.wmsURL}?service=WMS&version=1.1.1&request=DescribeLayer&layers=${action.layer}&output_format=application/json`))
                                .switchMap(({ data }) => // TODO change geoserver url
                                    Rx.Observable.of(addLayer({
                                        id: WMS_ID,
                                        type: 'wms',
                                        url: `${action.wmsURL}`,
                                        visibility: true,
                                        name: data.layerDescriptions && data.layerDescriptions[0] && data.layerDescriptions[0].layerName,
                                        title: data.layerDescriptions && data.layerDescriptions.layerName,
                                        ...(action.isWmsViewer && {params: {cql_filter: action.cql_filter}} || {})
                                    })).concat(
                                        Rx.Observable.defer( () => axios.get(`${data.layerDescriptions[0].owsURL}request=GetFeature&TypeName=${data.layerDescriptions[0].typeName}&outputFormat=application/json&srsName=EPSG:4326&version=1.1.0&cql_filter=${action.cql_filter}`) )
                                            .concatMap((res) => Rx.Observable.from([
                                                addLayer({
                                                    id: WFS_ID,
                                                    type: 'vector',
                                                    visibility: true,
                                                    group: "highlight",
                                                    name: "highlight",
                                                    hideLoading: true,
                                                    queryable: false,
                                                    style: {
                                                      weight: 3,
                                                      radius: 10,
                                                      opacity: 1,
                                                      fillOpacity: 0.1,
                                                      color: 'rgb(0, 0, 255)',
                                                      fillColor: 'rgb(0, 0, 255)'
                                                    },
                                                    features: res.data.features
                                                }),
                                                zoomToExtent(bbox(res.data), "EPSG:4326")]).filter(a => !( action.isWmsViewer && a.type === 'ADD_LAYER'))
                                        )
                                    )
                                )
                    ).catch( e => Rx.Observable.of(configureError('Configuration file broken (' + "config.json" + '): ' + e.message)))
            ),
        updateFeatureLoader: action$ => action$.ofType(UPDATE).switchMap((action) => Rx.Observable.from([
            removeLayer(WMS_ID),
            removeLayer(WFS_ID),
            startFeatureLoader(action.wmsURL, action, undefined, action.isWmsViewer)
        ]))
};
