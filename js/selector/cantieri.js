import {
    ELEMENTS_LAYER,
    AREAS_LAYER
}  from '../actions/cantieri';

import get from 'lodash/get';

export const stateSelector = state => state;
export const elementsLayerSelector = (state) => get(state, "layers.flat").filter(l => l.id === ELEMENTS_LAYER)[0];
export const areasLayerSelector = (state) => get(state, "layers.flat").filter(l => l.id === AREAS_LAYER)[0];
export const serviceRESTUrlSelector = (state) => get(state, "cantieri.serviceRESTUrl");
export const routingSelector = state => get(state, "routing.location.pathname");

export default {
    stateSelector,
    elementsLayerSelector,
    areasLayerSelector,
    serviceRESTUrlSelector,
    routingSelector
};
