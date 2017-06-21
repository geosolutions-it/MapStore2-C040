/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    plugins: {
        MousePositionPlugin: require('../MapStore2/web/client/plugins/MousePosition'),
        PrintPlugin: require('../MapStore2/web/client/plugins/Print'),
        IdentifyPlugin: require('../MapStore2/web/client/plugins/Identify'),
        TOCPlugin: require('../MapStore2/web/client/plugins/TOC'),
        MeasurePlugin: require('../MapStore2/web/client/plugins/Measure'),
        MeasureResultsPlugin: require('../MapStore2/web/client/plugins/MeasureResults'),
        MapPlugin: require('../MapStore2/web/client/plugins/Map'),
        ToolbarPlugin: require('../MapStore2/web/client/plugins/Toolbar'),
        DrawerMenuPlugin: require('../MapStore2/web/client/plugins/DrawerMenu'),
        ShapeFilePlugin: require('../MapStore2/web/client/plugins/ShapeFile'),
        SnapshotPlugin: require('../MapStore2/web/client/plugins/Snapshot'),
        SettingsPlugin: require('../MapStore2/web/client/plugins/Settings'),
        ExpanderPlugin: require('../MapStore2/web/client/plugins/Expander'),
        SearchPlugin: require('../MapStore2/web/client/plugins/Search'),
        ScaleBoxPlugin: require('../MapStore2/web/client/plugins/ScaleBox'),
        LocatePlugin: require('../MapStore2/web/client/plugins/Locate'),
        ZoomInPlugin: require('../MapStore2/web/client/plugins/ZoomIn'),
        ZoomOutPlugin: require('../MapStore2/web/client/plugins/ZoomOut'),
        ZoomAllPlugin: require('../MapStore2/web/client/plugins/ZoomAll'),
        FullScreenPlugin: require('../MapStore2/web/client/plugins/FullScreen'),
        MapLoadingPlugin: require('../MapStore2/web/client/plugins/MapLoading'),
        HelpPlugin: require('../MapStore2/web/client/plugins/Help'),
        HomePlugin: require('../MapStore2/web/client/plugins/Home'),
        MetadataExplorerPlugin: require('../MapStore2/web/client/plugins/MetadataExplorer'),
        LoginPlugin: require('./plugins/Login'),
        OmniBarPlugin: require('../MapStore2/web/client/plugins/OmniBar'),
        BurgerMenuPlugin: require('../MapStore2/web/client/plugins/BurgerMenu'),
        UndoPlugin: require('../MapStore2/web/client/plugins/History'),
        RedoPlugin: require('../MapStore2/web/client/plugins/History'),
        MapsPlugin: require('../MapStore2/web/client/plugins/Maps'),
        MapSearchPlugin: require('../MapStore2/web/client/plugins/MapSearch'),
        LanguagePlugin: require('../MapStore2/web/client/plugins/Language'),
        ManagerPlugin: require('../MapStore2/web/client/plugins/manager/Manager'),
        UserManagerPlugin: require('../MapStore2/web/client/plugins/manager/UserManager'),
        GroupManagerPlugin: require('../MapStore2/web/client/plugins/manager/GroupManager'),
        RulesManagerPlugin: require('../MapStore2/web/client/plugins/manager/RulesManager'),
        ManagerMenuPlugin: require('../MapStore2/web/client/plugins/manager/ManagerMenu'),
        RedirectPlugin: require('../MapStore2/web/client/plugins/Redirect'),
        SharePlugin: require('../MapStore2/web/client/plugins/Share'),
        SavePlugin: require('../MapStore2/web/client/plugins/Save'),
        SaveAsPlugin: require('../MapStore2/web/client/plugins/SaveAs'),
        CreateNewMapPlugin: require('../MapStore2/web/client/plugins/CreateNewMap'),
        QueryPanelPlugin: require('../MapStore2/web/client/plugins/QueryPanel'),
        FeatureGridPlugin: require('../MapStore2/web/client/plugins/FeatureGrid'),
        WFSDownloadPlugin: require('../MapStore2/web/client/plugins/WFSDownload'),
        TutorialPlugin: require('../MapStore2/web/client/plugins/Tutorial'),
        ScrollTopPlugin: require('../MapStore2/web/client/plugins/ScrollTop'),
        GlobeViewSwitcher: require('../MapStore2/web/client/plugins/GlobeViewSwitcher'),
        BackgroundSelector: require('../MapStore2/web/client/plugins/BackgroundSelector'),
        SearchServicesConfig: require('../MapStore2/web/client/plugins/SearchServicesConfig'),
        HeaderPlugin: require('./plugins/Header'),
        FooterPlugin: require('./plugins/Footer'),
        AttributionPlugin: require('./plugins/Attribution'),
        FeatureLoader: require('./plugins/FeatureLoader'),
        NotificationsPlugin: require('../MapStore2/web/client/plugins/Notifications'),
        LavoriPubbliciPlugin: require('./plugins/LavoriPubblici')
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,
        SwipeHeader: require('../MapStore2/web/client/components/data/identify/SwipeHeader')
    }
};
