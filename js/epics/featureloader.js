const {STARTLOADING} = require('../actions/featureloader');
const {resetControls} = require('../../MapStore2/web/client/actions/controls');
const {zoomToExtent} = require('../../MapStore2/web/client/actions/map');
const {configureMap, configureError} = require('../../MapStore2/web/client/actions/config');
const {addLayer} = require('../../MapStore2/web/client/actions/layers');
const Rx = require('rxjs');
const axios = require('../../MapStore2/web/client/libs/ajax');
const CoordinatesUtils = require('../../MapStore2/web/client/utils/CoordinatesUtils');

module.exports = {
        startLoading: ( action$ ) =>
            action$.ofType(STARTLOADING)
                .switchMap( (action) =>
                    Rx.Observable.of(resetControls())
                        .concat(
                            axios.get("config.json")
                                .then( (response) => {
                                    if (typeof response.data === 'object') {
                                        return configureMap(response.data);
                                    }
                                }))
                        .concat(
                            Rx.Observable.defer(() => axios.get( `${action.wmsURL}?service=WMS&version=1.1.1&request=DescribeLayer&layers=${action.layer}&output_format=application/json`))
                                .switchMap(({ data }) => // TODO change geoserver url
                                    Rx.Observable.of(addLayer({
                                        type: 'wms',
                                        url: `${action.wmsURL}`,
                                        visibility: true,
                                        name: data.layerDescriptions && data.layerDescriptions[0] && data.layerDescriptions[0].layerName,
                                        title: data.layerDescriptions && data.layerDescriptions.layerName
                                    })).concat(
                                        Rx.Observable.defer( () => axios.get(`${data.layerDescriptions[0].owsURL}request=GetFeature&TypeName=${data.layerDescriptions[0].typeName}&outputFormat=application/json&srsName=EPSG:4326&version=1.1.0&cql_filter=${action.cql_filter}`) )
                                            .concatMap((res) => Rx.Observable.from([
                                                addLayer({
                                                    type: 'vector',
                                                    visibility: true,
                                                    group: "highlight",
                                                    name: "highlight",
                                                    hideLoading: true,
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
                                                zoomToExtent(CoordinatesUtils.getGeoJSONExtent(res.data), "EPSG:4326")])
                                        )
                                    )
                                )
                    ).catch( e => Rx.Observable.of(configureError('Configuration file broken (' + "config.json" + '): ' + e.message)))
            )

};
