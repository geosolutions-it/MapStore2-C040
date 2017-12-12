/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = {
    plugins: {
        BackgroundSelectorPlugin: require('../MapStore2/web/client/plugins/BackgroundSelector'),
        MapPlugin: require('../MapStore2/web/client/plugins/Map'),
        ToolbarPlugin: require('../MapStore2/web/client/plugins/Toolbar'),
        DrawerMenuPlugin: require('../MapStore2/web/client/plugins/DrawerMenu'),
        LocatePlugin: require('../MapStore2/web/client/plugins/Locate'),
        ZoomInPlugin: require('../MapStore2/web/client/plugins/ZoomIn'),
        ZoomOutPlugin: require('../MapStore2/web/client/plugins/ZoomOut'),
        ZoomAllPlugin: require('../MapStore2/web/client/plugins/ZoomAll'),
        MapLoadingPlugin: require('../MapStore2/web/client/plugins/MapLoading'),
        HelpPlugin: require('../MapStore2/web/client/plugins/Help'),
        LoginPlugin: require('../MapStore2/web/client/plugins/Login'),
        OmniBarPlugin: require('../MapStore2/web/client/plugins/OmniBar'),
        BurgerMenuPlugin: require('../MapStore2/web/client/plugins/BurgerMenu'),
        UndoPlugin: require('../MapStore2/web/client/plugins/History'),
        RedoPlugin: require('../MapStore2/web/client/plugins/History'),
        MapsPlugin: require('../MapStore2/web/client/plugins/Maps'),
        MapSearchPlugin: require('../MapStore2/web/client/plugins/MapSearch'),
        LanguagePlugin: require('../MapStore2/web/client/plugins/Language'),
        RedirectPlugin: require('../MapStore2/web/client/plugins/Redirect'),
        FeatureGridPlugin: require('../MapStore2/web/client/plugins/FeatureGrid'),
        TutorialPlugin: require('../MapStore2/web/client/plugins/Tutorial'),
        NotificationsPlugin: require('../MapStore2/web/client/plugins/Notifications'),
        AttributionPlugin: require('./plugins/Attribution'),
        FeatureLoader: require('./plugins/FeatureLoader'),
        LavoriPubbliciPlugin: require('./plugins/LavoriPubblici')
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,
        SwipeHeader: require('../MapStore2/web/client/components/data/identify/SwipeHeader')
    }
};
