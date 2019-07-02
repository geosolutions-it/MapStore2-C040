/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
    plugins: {
        // custom plugins
        AttributionPlugin: require('./plugins/Attribution'),
        FeatureLoader: require('./plugins/FeatureLoader'),
        LavoriPubbliciPlugin: require('./plugins/LavoriPubblici'),
        // framework plugins
        BackgroundSelectorPlugin: require('../MapStore2/web/client/plugins/BackgroundSelector'),
        BurgerMenuPlugin: require('../MapStore2/web/client/plugins/BurgerMenu'),
        DrawerMenuPlugin: require('../MapStore2/web/client/plugins/DrawerMenu'),
        FeatureGridPlugin: require('../MapStore2/web/client/plugins/FeatureGrid'),
        FeedbackMaskPlugin: require('../MapStore2/web/client/plugins/FeedbackMask'),
        HelpPlugin: require('../MapStore2/web/client/plugins/Help'),
        LanguagePlugin: require('../MapStore2/web/client/plugins/Language'),
        LocatePlugin: require('../MapStore2/web/client/plugins/Locate'),
        LoginPlugin: require('../MapStore2/web/client/plugins/Login'),
        MapLoadingPlugin: require('../MapStore2/web/client/plugins/MapLoading'),
        MapPlugin: require('../MapStore2/web/client/plugins/Map'),
        MapSearchPlugin: require('../MapStore2/web/client/plugins/MapSearch'),
        MapsPlugin: require('../MapStore2/web/client/plugins/Maps'),
        NotificationsPlugin: require('../MapStore2/web/client/plugins/Notifications'),
        OmniBarPlugin: require('../MapStore2/web/client/plugins/OmniBar'),
        RedirectPlugin: require('../MapStore2/web/client/plugins/Redirect'),
        RedoPlugin: require('../MapStore2/web/client/plugins/History'),
        SearchPlugin: require('../MapStore2/web/client/plugins/Search'),
        SearchServicesConfig: require('../MapStore2/web/client/plugins/SearchServicesConfig'),
        ToolbarPlugin: require('../MapStore2/web/client/plugins/Toolbar'),
        TutorialPlugin: require('../MapStore2/web/client/plugins/Tutorial'),
        UndoPlugin: require('../MapStore2/web/client/plugins/History'),
        ZoomAllPlugin: require('../MapStore2/web/client/plugins/ZoomAll'),
        ZoomInPlugin: require('../MapStore2/web/client/plugins/ZoomIn'),
        ZoomOutPlugin: require('../MapStore2/web/client/plugins/ZoomOut')
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,
        SwipeHeader: require('../MapStore2/web/client/components/data/identify/SwipeHeader')
    }
};
