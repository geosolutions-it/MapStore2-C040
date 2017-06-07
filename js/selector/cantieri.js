const {
    ELEMENTS_LAYER,
    AREAS_LAYER
} = require('../actions/cantieri');

module.exports = {
    stateSelector: state => state,
    elementsLayerSelector: (state) => state.layers && state.layers.flat && state.layers.flat.filter(l => l.id === ELEMENTS_LAYER)[0],
    areasLayerSelector: (state) => state.layers && state.layers.flat && state.layers.flat.filter(l => l.id === AREAS_LAYER)[0]
};
