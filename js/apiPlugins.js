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
        // framework plugins
        BackgroundSwitcherPlugin: require('../MapStore2/web/client/plugins/BackgroundSwitcher'),
        BurgerMenuPlugin: require('../MapStore2/web/client/plugins/BurgerMenu'),
        CreateNewMapPlugin: require('../MapStore2/web/client/plugins/CreateNewMap'),
        DrawerMenuPlugin: require('../MapStore2/web/client/plugins/DrawerMenu'),
        ExpanderPlugin: require('../MapStore2/web/client/plugins/Expander'),
        FeatureGridPlugin: require('../MapStore2/web/client/plugins/FeatureGrid'),
        HelpPlugin: require('../MapStore2/web/client/plugins/Help'),
        HomePlugin: require('../MapStore2/web/client/plugins/Home'),
        IdentifyPlugin: require('../MapStore2/web/client/plugins/Identify'),
        LanguagePlugin: require('../MapStore2/web/client/plugins/Language'),
        LocatePlugin: require('../MapStore2/web/client/plugins/Locate'),
        LoginPlugin: require('../MapStore2/web/client/plugins/Login'),
        MapFooter: require('../MapStore2/web/client/plugins/MapFooter'),
        MapLoadingPlugin: require('../MapStore2/web/client/plugins/MapLoading'),
        MapPlugin: require('../MapStore2/web/client/plugins/Map'),
        MapSearchPlugin: require('../MapStore2/web/client/plugins/MapSearch'),
        MapsPlugin: require('../MapStore2/web/client/plugins/Maps'),
        MeasurePlugin: require('../MapStore2/web/client/plugins/Measure'),
        MeasureResultsPlugin: require('../MapStore2/web/client/plugins/MeasureResults'),
        MetadataExplorerPlugin: require('../MapStore2/web/client/plugins/MetadataExplorer'),
        MousePositionPlugin: require('../MapStore2/web/client/plugins/MousePosition'),
        NotificationsPlugin: require('../MapStore2/web/client/plugins/Notifications'),
        OmniBarPlugin: require('../MapStore2/web/client/plugins/OmniBar'),
        PrintPlugin: require('../MapStore2/web/client/plugins/Print'),
        QueryPanelPlugin: require('../MapStore2/web/client/plugins/QueryPanel'),
        RedirectPlugin: require('../MapStore2/web/client/plugins/Redirect'),
        RedoPlugin: require('../MapStore2/web/client/plugins/History'),
        SaveAsPlugin: require('../MapStore2/web/client/plugins/SaveAs'),
        SavePlugin: require('../MapStore2/web/client/plugins/Save'),
        ScaleBoxPlugin: require('../MapStore2/web/client/plugins/ScaleBox'),
        SearchPlugin: require('../MapStore2/web/client/plugins/Search'),
        SettingsPlugin: require('../MapStore2/web/client/plugins/Settings'),
        SharePlugin: require('../MapStore2/web/client/plugins/Share'),
        SnapshotPlugin: require('../MapStore2/web/client/plugins/Snapshot'),
        TOCPlugin: require('../MapStore2/web/client/plugins/TOC'),
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
