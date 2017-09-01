const {
    ELEMENTS_LAYER,
    AREAS_LAYER
} = require('../actions/cantieri');

const {get} = require('lodash');
module.exports = {
    stateSelector: state => state,
    elementsLayerSelector: (state) => get(state, "layers.flat").filter(l => l.id === ELEMENTS_LAYER)[0],
    areasLayerSelector: (state) => get(state, "layers.flat").filter(l => l.id === AREAS_LAYER)[0],
    saveServiceRESTUrlSelector: (state) => get(state, "cantieri.saveServiceRESTUrl"),
    fetchServiceRESTUrlSelector: (state) => get(state, "cantieri.fetchServiceRESTUrl")
};
