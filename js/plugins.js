/*
 * Copyright 2016, GeoSolutions Sas.
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
        FooterPlugin: require('./plugins/Footer'),
        GeoNetworkLinkPlugin: require('./plugins/GeoNetworkLink'),
        HeaderPlugin: require('./plugins/Header'),
        LoginPlugin: require('./plugins/Login'),
        LoginModalPlugin: require('./plugins/LoginModal'),
        PrivacyNote: require('./plugins/PrivacyNote'),
        // product plugins
        NavMenu: require('../MapStore2/web/client/product/plugins/NavMenu'),
        // framework  plugin
        AddGroupPlugin: require('../MapStore2/web/client/plugins/AddGroup').default,
        // AnnotationsPlugin: require('../MapStore2/web/client/plugins/Annotations'), NOT NEEDED
        AutoMapUpdatePlugin: require('../MapStore2/web/client/plugins/AutoMapUpdate'),
        BackgroundSelectorPlugin: require('../MapStore2/web/client/plugins/BackgroundSelector'),
        // BackgroundSwitcherPlugin: require('../MapStore2/web/client/plugins/BackgroundSwitcher'), NOT_NEEDED
        BurgerMenuPlugin: require('../MapStore2/web/client/plugins/BurgerMenu'),
        // CRSSelectorPlugin: require('../MapStore2/web/client/plugins/CRSSelector'), NOT NEEDED
        ContentTabs: require('../MapStore2/web/client/plugins/ContentTabs'),
        CookiePlugin: require('../MapStore2/web/client/plugins/Cookie'),
        CreateNewMapPlugin: require('../MapStore2/web/client/plugins/CreateNewMap'),
        Dashboard: require('../MapStore2/web/client/plugins/Dashboard'),
        DashboardEditor: require('../MapStore2/web/client/plugins/DashboardEditor'),
        DashboardSavePlugin: require('../MapStore2/web/client/plugins/DashboardSave').DashboardSave,
        DashboardSaveAsPlugin: require('../MapStore2/web/client/plugins/DashboardSave').DashboardSaveAs,
        DashboardsPlugin: require('../MapStore2/web/client/plugins/Dashboards'),
        DetailsPlugin: require('../MapStore2/web/client/plugins/Details'),
        DrawerMenuPlugin: require('../MapStore2/web/client/plugins/DrawerMenu'),
        ExpanderPlugin: require('../MapStore2/web/client/plugins/Expander'),
        FeatureEditorPlugin: require('../MapStore2/web/client/plugins/FeatureEditor'),
        FeaturedMaps: require('../MapStore2/web/client/plugins/FeaturedMaps'),
        FeedbackMaskPlugin: require('../MapStore2/web/client/plugins/FeedbackMask'),
        // FloatingLegendPlugin: require('../MapStore2/web/client/plugins/FloatingLegend'), NOT_NEEDED
        FullScreenPlugin: require('../MapStore2/web/client/plugins/FullScreen'),
        GlobeViewSwitcherPlugin: require('../MapStore2/web/client/plugins/GlobeViewSwitcher'),
        GoFull: require('../MapStore2/web/client/plugins/GoFull'),
        // GridContainerPlugin: require('../MapStore2/web/client/plugins/GridContainer'), NOT NEEDED (bound to theme ThemeSwitcherPlugin and MapTypePlugin)
        GroupManagerPlugin: require('../MapStore2/web/client/plugins/manager/GroupManager'),
        // HelpLinkPlugin: require('../MapStore2/web/client/plugins/Help'), NOT NEEDED
        HelpPlugin: require('../MapStore2/web/client/plugins/Help'),
        HomePlugin: require('../MapStore2/web/client/plugins/Home'),
        IdentifyPlugin: require('../MapStore2/web/client/plugins/Identify'),
        LanguagePlugin: require('../MapStore2/web/client/plugins/Language'),
        LocatePlugin: require('../MapStore2/web/client/plugins/Locate'),
        ManagerMenuPlugin: require('../MapStore2/web/client/plugins/manager/ManagerMenu'),
        ManagerPlugin: require('../MapStore2/web/client/plugins/manager/Manager'),
        MapExportPlugin: require('../MapStore2/web/client/plugins/MapExport').default,
        MapFooterPlugin: require('../MapStore2/web/client/plugins/MapFooter'),
        MapImportPlugin: require('../MapStore2/web/client/plugins/MapImport'),
        MapLoadingPlugin: require('../MapStore2/web/client/plugins/MapLoading'),
        MapPlugin: require('../MapStore2/web/client/plugins/Map'),
        MapSearchPlugin: require('../MapStore2/web/client/plugins/MapSearch'),
        MapsPlugin: require('../MapStore2/web/client/plugins/Maps'),
        MeasurePlugin: require('../MapStore2/web/client/plugins/Measure'),
        MetadataExplorerPlugin: require('../MapStore2/web/client/plugins/MetadataExplorer'),
        MousePositionPlugin: require('../MapStore2/web/client/plugins/MousePosition'),
        NotificationsPlugin: require('../MapStore2/web/client/plugins/Notifications'),
        OmniBarPlugin: require('../MapStore2/web/client/plugins/OmniBar'),
        // PlaybackPlugin: require('../MapStore2/web/client/plugins/Playback'), NOT NEEDED
        PrintPlugin: require('../MapStore2/web/client/plugins/Print'),
        QueryPanelPlugin: require('../MapStore2/web/client/plugins/QueryPanel'),
        RedirectPlugin: require('../MapStore2/web/client/plugins/Redirect'),
        RedoPlugin: require('../MapStore2/web/client/plugins/History'),
        RulesDataGridPlugin: require('../MapStore2/web/client/plugins/RulesDataGrid'),
        RulesEditorPlugin: require('../MapStore2/web/client/plugins/RulesEditor'),
        RulesManagerFooter: require('../MapStore2/web/client/plugins/RulesManagerFooter'),
        SaveAsPlugin: require('../MapStore2/web/client/plugins/SaveAs').default,
        SavePlugin: require('../MapStore2/web/client/plugins/Save').default,
        ScaleBoxPlugin: require('../MapStore2/web/client/plugins/ScaleBox'),
        ScrollTopPlugin: require('../MapStore2/web/client/plugins/ScrollTop'),
        SearchPlugin: require('../MapStore2/web/client/plugins/Search'),
        SearchServicesConfigPlugin: require('../MapStore2/web/client/plugins/SearchServicesConfig'),
        SettingsPlugin: require('../MapStore2/web/client/plugins/Settings'),
        SharePlugin: require('../MapStore2/web/client/plugins/Share'),
        SnapshotPlugin: require('../MapStore2/web/client/plugins/Snapshot'),
        // StyleEditorPlugin: require('../MapStore2/web/client/plugins/StyleEditor'), NOT_NEEDED
        TOCItemsSettingsPlugin: require('../MapStore2/web/client/plugins/TOCItemsSettings'),
        TOCPlugin: require('../MapStore2/web/client/plugins/TOC'),
        ThematicLayerPlugin: require('../MapStore2/web/client/plugins/ThematicLayer'),
        // ThemeSwitcherPlugin: require('../plugins/ThemeSwitcher'), NOT_NEEDED
        // TimelinePlugin: require('../MapStore2/web/client/plugins/Timeline'), NOT_NEEDED
        ToolbarPlugin: require('../MapStore2/web/client/plugins/Toolbar'),
        TutorialPlugin: require('../MapStore2/web/client/plugins/Tutorial'),
        UndoPlugin: require('../MapStore2/web/client/plugins/History'),
        UserManagerPlugin: require('../MapStore2/web/client/plugins/manager/UserManager'),
        VersionPlugin: require('../MapStore2/web/client/plugins/Version'),
        WFSDownloadPlugin: require('../MapStore2/web/client/plugins/WFSDownload'),
        WidgetsBuilderPlugin: require('../MapStore2/web/client/plugins/WidgetsBuilder'),
        WidgetsPlugin: require('../MapStore2/web/client/plugins/Widgets'),
        WidgetsTrayPlugin: require('../MapStore2/web/client/plugins/WidgetsTray'),
        ZoomAllPlugin: require('../MapStore2/web/client/plugins/ZoomAll'),
        ZoomInPlugin: require('../MapStore2/web/client/plugins/ZoomIn'),
        ZoomOutPlugin: require('../MapStore2/web/client/plugins/ZoomOut')
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,
        SwipeHeader: require('../MapStore2/web/client/components/data/identify/SwipeHeader')
    }
};
