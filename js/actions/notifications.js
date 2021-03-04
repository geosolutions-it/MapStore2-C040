import {error, info, success} from '@mapstore/actions/notifications';
import {
    SUCCESS_SAVING, ERROR_REMOVE_CANTIERI_AREA, ERROR_RESET_CANTIERI_FEATURES, ERROR_DRAWING_AREAS,
    ERROR_LOAD_CANTIERI_AREAS
} from '@js/actions/cantieri';
import assign from 'object-assign';

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
export const errorSavingData = () => error(assign({}, defaultErrorOptions, {
    message: "cantieriGrid.notification.errorSavingData"
}));
export const errorSavingElements = (message) => error(assign({}, defaultErrorOptions, {
    message
}));
export const errorRemoveFeature = () => error(assign({}, defaultErrorOptions, {
    uid: ERROR_REMOVE_CANTIERI_AREA,
    message: "cantieriGrid.notification.removeFeatureError"
}));
export const errorResetCantieriFeatures = () => error(assign({}, defaultErrorOptions, {
    uid: ERROR_RESET_CANTIERI_FEATURES,
    message: "cantieriGrid.notification.resetCantieriFeaturesError"
}));
export const errorDrawingAreas = () => error(assign({}, defaultErrorOptions, {
    uid: ERROR_DRAWING_AREAS,
    message: "cantieriGrid.notification.errorDrawingAreas"
}));
export const errorLoadCantieriAreas = () => error(assign({}, defaultErrorOptions, {
    uid: ERROR_LOAD_CANTIERI_AREAS,
    message: "cantieriGrid.notification.errorLoadCantieriAreas"
}));
/* ************************** SUCCESS notifications ************************** */
export const successSavingData = () => success(assign({}, defaultSuccessOptions, {
    uid: SUCCESS_SAVING,
    message: "cantieriGrid.notification.successSaving",
    position: "tc"
}));
/* ************************** INFO notifications ************************** */
export const infoNoFeaturesSelected = () => info(assign({}, defaultInfoOptions, {
    message: "cantieriGrid.notification.noFeaturesSelected",
    position: "tc"
}));
export const infoElementAlreadyPresent = () => info(assign({}, defaultInfoOptions, {
    message: "cantieriGrid.notification.elementAlreadyPresent",
    position: "tc"
}));

export default {
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
