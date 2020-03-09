/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const expect = require('expect');
const {
    serviceRESTUrlSelector,
    areasLayerSelector,
    elementsLayerSelector
} = require('../cantieri');
const restUrl = "http://fetchUrl/rest";
const idElementLayer = "CANTIERI::ELEMENTS_LAYER";
const idAreaLayer = "CANTIERI::AREAS_LAYER";
const elementLayer = {
    group: 'Cantiere',
    name: 'cantiere_elements',
    id: idElementLayer,
    title: 'Elementi Selezionati',
    type: 'vector',
    features: [],
    visibility: true,
    crs: 'EPSG:900913',
    featuresCrs: 'EPSG:900913',
    style: {
        type: 'MultiPolygon',
        stroke: {
            color: 'red',
            width: 1
        },
        fill: {
            color: [
                100,
                100,
                100,
                0.1
            ]
        }
    }
};
const state = {
    layers: {
        flat: [
            {
                type: 'osm',
                title: 'Open Street Map',
                name: 'mapnik',
                source: 'osm',
                group: 'background',
                visibility: false,
                id: 'mapnik__0'
            },
            {
                url: '/geoserver-test/ows',
                type: 'wms',
                format: 'image/png8',
                name: 'CORSO_1:V_ELEMENTI_CANTIERI',
                title: 'Elementi Esistenti',
                group: 'Cantiere',
                visibility: true,
                id: 'CORSO_1:V_ELEMENTI_CANTIERI__1',
                loading: false,
                loadingError: false
            },
            elementLayer,
            {
                group: 'Cantiere',
                name: 'CORSO_1:AREE_CANTIERE',
                id: idAreaLayer,
                title: 'Aree',
                type: 'vector',
                features: [],
                visibility: true,
                crs: 'EPSG:900913',
                featuresCrs: 'EPSG:900913',
                style: {
                    type: 'MultiPolygon',
                    stroke: {
                        color: 'blue',
                        width: 3
                    },
                    fill: {
                        color: [
                            0,
                            0,
                            0,
                            0
                        ]
                    }
                }
            }
        ]
    },
    cantieri: {
        elementsGrid: {
            rowKey: 'id',
            columns: [
                {
                    key: 'id',
                    name: 'ID',
                    resizable: true
                },
                {
                    key: 'name',
                    name: 'Nome Livello',
                    resizable: true
                }
            ],
            selectBy: {
                isSelectedKey: 'checked'
            }
        },
        areasGrid: {
            rowKey: 'name',
            columns: [
                {
                    key: 'delete',
                    name: 'Elimina',
                    resizable: true
                },
                {
                    key: 'name',
                    name: 'nome area',
                    resizable: true
                }
            ]
        },
        activeGrid: 'elementsGrid',
        serviceRESTUrl: restUrl
    }
};
describe('Testing the cantieri selectors', () => {

    it('serviceRESTUrlSelector', () => {
        const retVal = serviceRESTUrlSelector(state);
        expect(retVal).toBe(restUrl);
    });
    it('elementsLayerSelector', () => {
        const retVal = elementsLayerSelector(state);
        expect(retVal.id).toBe(idElementLayer);
    });
    it('areasLayerSelector', () => {
        const retVal = areasLayerSelector(state);
        expect(retVal.id).toBe(idAreaLayer);
    });

});
