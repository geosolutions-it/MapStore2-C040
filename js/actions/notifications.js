const {error, info, success} = require('../../MapStore2/web/client/actions/notifications');
const {
    SUCCESS_SAVING, ERROR_REMOVE_CANTIERI_AREA, ERROR_RESET_CANTIERI_FEATURES, ERROR_DRAWING_AREAS,
    ERROR_LOAD_CANTIERI_AREAS
} = require('./cantieri');
const assign = require('object-assign');

const defaultErrorOptions = {
    title: "warning",
    action: {label: "cantieriGrid.notification.confirm"},
    autoDismiss: 3,
    position: "tr"
};
const defaultSuccessOptions = {
    title: "warning",
    action: {label: "cantieriGrid.notification.confirm"},
    autoDismiss: 3,
    position: "tc"
};
const defaultInfoOptions = {
    title: "warning",
    action: {label: "cantieriGrid.notification.confirm"},
    autoDismiss: 3,
    position: "tc"
};
/* ************************** ERROR notifications ************************** */
const errorSavingData = () => error(assign({}, defaultErrorOptions, {
    message: "cantieriGrid.notification.errorSavingData"
}));
const errorSavingElements = (message) => error(assign({}, defaultErrorOptions, {
    message
}));
const errorRemoveFeature = () => error(assign({}, defaultErrorOptions, {
    uid: ERROR_REMOVE_CANTIERI_AREA,
    message: "cantieriGrid.notification.removeFeatureError"
}));
const errorResetCantieriFeatures = () => error(assign({}, defaultErrorOptions, {
    uid: ERROR_RESET_CANTIERI_FEATURES,
    message: "cantieriGrid.notification.resetCantieriFeaturesError"
}));
const errorDrawingAreas = () => error(assign({}, defaultErrorOptions, {
    uid: ERROR_DRAWING_AREAS,
    message: "cantieriGrid.notification.errorDrawingAreas"
}));
const errorLoadCantieriAreas = () => error(assign({}, defaultErrorOptions, {
    uid: ERROR_LOAD_CANTIERI_AREAS,
    message: "cantieriGrid.notification.errorLoadCantieriAreas"
}));
/* ************************** SUCCESS notifications ************************** */
const successSavingData = () => success(assign({}, defaultSuccessOptions, {
    uid: SUCCESS_SAVING,
    message: "cantieriGrid.notification.successSaving",
    position: "tc"
}));
/* ************************** INFO notifications ************************** */
const infoNoFeaturesSelected = () => info(assign({}, defaultInfoOptions, {
    message: "cantieriGrid.notification.noFeaturesSelected",
    position: "tc"
}));
const infoElementAlreadyPresent = () => info(assign({}, defaultInfoOptions, {
    message: "cantieriGrid.notification.elementAlreadyPresent",
    position: "tc"
}));

module.exports = {
    errorSavingData,
    errorSavingElements,
    errorRemoveFeature,
    errorResetCantieriFeatures,
    errorDrawingAreas,
    errorLoadCantieriAreas,
    successSavingData,
    infoNoFeaturesSelected,
    infoElementAlreadyPresent
};
