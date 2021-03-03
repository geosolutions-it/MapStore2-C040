/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {STARTLOADING, UPDATE, startFeatureLoader}  from '../actions/featureloader';
import {resetControls}  from '@mapstore/actions/controls';
import {zoomToExtent}  from '@mapstore/actions/map';
import {configureMap, configureError}  from '@mapstore/actions/config';
import {addLayer, removeLayer}  from '@mapstore/actions/layers';
import Rx  from 'rxjs';
import axios  from '@mapstore/libs/ajax';
import bbox  from '@turf/bbox';

const WMS_ID = "FEATURE_SELECTOR_WMS";
const WFS_ID = "FEATURE_SELECTOR_WFS";


export const startLoading = ( action$ ) =>
    action$.ofType(STARTLOADING)
        .switchMap( (action) =>
            Rx.Observable.of(resetControls())
                .concat(
                    action.configURL ? axios.get("config.json")
                        .then( (response) => {
                            if (typeof response.data === 'object') {
                                return configureMap(response.data);
                            }
                            return null;
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
                                            style: null,
                                            features: res.data.features.map(f => ({...f, style: {
                                                weight: 3,
                                                color: "#0000FF",
                                                opacity: 1,
                                                fillColor: "#0000FF",
                                                fillOpacity: 1
                                            }}))
                                        }),
                                        zoomToExtent(bbox(res.data), "EPSG:4326", 19)]).filter(a => !( action.isWmsViewer && a.type === 'ADD_LAYER'))
                                    )
                            )
                        )
                ).catch( e => Rx.Observable.of(configureError('Configuration file broken (' + "config.json" + '): ' + e.message)))
        );
export const updateFeatureLoader = action$ => action$.ofType(UPDATE).switchMap((action) => Rx.Observable.from([
    removeLayer(WMS_ID),
    removeLayer(WFS_ID),
    startFeatureLoader(action.wmsURL, action, undefined, action.isWmsViewer)
]));


export default {
    startLoading,
    updateFeatureLoader
};
