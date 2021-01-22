/*
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

// TODO take all plugins from ms2

// custom plugins
import AttributionPlugin from './plugins/Attribution';
import FeatureLoader from './plugins/FeatureLoader';
import FooterPlugin from './plugins/Footer';
import GeoNetworkLinkPlugin from './plugins/GeoNetworkLink';
import HeaderPlugin from './plugins/Header';
import LoginPlugin from './plugins/Login';
import LoginModalPlugin from './plugins/LoginModal';
import PrivacyNote from './plugins/PrivacyNote';
// product plugins
import NavMenu from '@mapstore/product/plugins/NavMenu';
import AboutPlugin from '@mapstore/product/plugins/About';
// framework  plugin
import AddGroupPlugin from '@mapstore/plugins/AddGroup';
import AnnotationsPlugin from '@mapstore/plugins/Annotations';
import AutoMapUpdatePlugin from '@mapstore/plugins/AutoMapUpdate';
import BackgroundSelectorPlugin from '@mapstore/plugins/BackgroundSelector';
// BackgroundSwitcherPlugin from '@mapstore/plugins/BackgroundSwitcher'; NOT_NEEDED
import BurgerMenuPlugin from '@mapstore/plugins/BurgerMenu';
import CRSSelectorPlugin from '@mapstore/plugins/CRSSelector';
import ContentTabs from '@mapstore/plugins/ContentTabs';
import ContextPlugin from '@mapstore/plugins/Context';
import ContextCreatorPlugin from '@mapstore/plugins/ContextCreator';
import ContextManagerPlugin from '@mapstore/plugins/contextmanager/ContextManager';
import CookiePlugin from '@mapstore/plugins/Cookie';
import CreateNewMapPlugin from '@mapstore/plugins/CreateNewMap';
import Dashboard from '@mapstore/plugins/Dashboard';
import DashboardEditor from '@mapstore/plugins/DashboardEditor';
import {
    DashboardSaveAs as DashboardSavePlugin,
    DashboardSaveAs as DashboardSaveAsPlugin
} from '@mapstore/plugins/DashboardSave';
import DashboardsPlugin from '@mapstore/plugins/Dashboards';
import DetailsPlugin from '@mapstore/plugins/Details';
import DrawerMenuPlugin from '@mapstore/plugins/DrawerMenu';
import ExpanderPlugin from '@mapstore/plugins/Expander';
import FeatureEditorPlugin from '@mapstore/plugins/FeatureEditor';
import FeaturedMaps from '@mapstore/plugins/FeaturedMaps';
import FeedbackMaskPlugin from '@mapstore/plugins/FeedbackMask';
import FilterLayerPlugin from '@mapstore/plugins/FilterLayer';
// FloatingLegendPlugin from '@mapstore/plugins/FloatingLegend'; NOT_NEEDED
import FullScreenPlugin from '@mapstore/plugins/FullScreen';
import GeoStoryPlugin from '@mapstore/plugins/GeoStory';
import GeoStoriesPlugin from '@mapstore/plugins/GeoStories';
import GeoStoryEditorPlugin from '@mapstore/plugins/GeoStoryEditor';
import {
    GeoStorySave as GeoStorySavePlugin,
    GeoStorySaveAs as GeoStorySaveAsPlugin
} from '@mapstore/plugins/GeoStorySave';
import GeoStoryNavigationPlugin from '@mapstore/plugins/GeoStoryNavigation';
import GlobeViewSwitcherPlugin from '@mapstore/plugins/GlobeViewSwitcher';
import GoFull from '@mapstore/plugins/GoFull';
// GridContainerPlugin from '@mapstore/plugins/GridContainer'; NOT NEEDED (bound to theme ThemeSwitcherPlugin and MapTypePlugin)
import GroupManagerPlugin from '@mapstore/plugins/manager/GroupManager';
import HelpLinkPlugin from '@mapstore/plugins/HelpLink';
import HelpPlugin from '@mapstore/plugins/Help';
import HomePlugin from '@mapstore/plugins/Home';
import IdentifyPlugin from '@mapstore/plugins/Identify';
import LanguagePlugin from '@mapstore/plugins/Language';
import LocatePlugin from '@mapstore/plugins/Locate';
import ManagerMenuPlugin from '@mapstore/plugins/manager/ManagerMenu';
import ManagerPlugin from '@mapstore/plugins/manager/Manager';
import MapEditorPlugin from '@mapstore/plugins/MapEditor';
import MapExportPlugin from '@mapstore/plugins/MapExport';
import MapFooterPlugin from '@mapstore/plugins/MapFooter';
import MapImportPlugin from '@mapstore/plugins/MapImport';
import MapLoadingPlugin from '@mapstore/plugins/MapLoading';
import MapPlugin from '@mapstore/plugins/Map';
import MapSearchPlugin from '@mapstore/plugins/MapSearch';
import MapsPlugin from '@mapstore/plugins/Maps';
import MapCatalogPlugin from '@mapstore/plugins/MapCatalog';
import MapTemplatesPlugin from '@mapstore/plugins/MapTemplates';
import MeasurePlugin from '@mapstore/plugins/Measure';
import MediaEditorPlugin from '@mapstore/plugins/MediaEditor';
import MetadataExplorerPlugin from '@mapstore/plugins/MetadataExplorer';
import MousePositionPlugin from '@mapstore/plugins/MousePosition';
import NotificationsPlugin from '@mapstore/plugins/Notifications';
import OmniBarPlugin from '@mapstore/plugins/OmniBar';
import PlaybackPlugin from '@mapstore/plugins/Playback';
import PrintPlugin from '@mapstore/plugins/Print';
import QueryPanelPlugin from '@mapstore/plugins/QueryPanel';
import RedirectPlugin from '@mapstore/plugins/Redirect';
import History from '@mapstore/plugins/History';
import RulesDataGridPlugin from '@mapstore/plugins/RulesDataGrid';
import RulesEditorPlugin from '@mapstore/plugins/RulesEditor';
import RulesManagerFooter from '@mapstore/plugins/RulesManagerFooter';
import SaveAsPlugin from '@mapstore/plugins/SaveAs';
import SavePlugin from '@mapstore/plugins/Save';
import ScaleBoxPlugin from '@mapstore/plugins/ScaleBox';
import ScrollTopPlugin from '@mapstore/plugins/ScrollTop';
import SearchPlugin from '@mapstore/plugins/Search';
import SearchServicesConfigPlugin from '@mapstore/plugins/SearchServicesConfig';
import SearchByBookmarkPlugin from '@mapstore/plugins/SearchByBookmark';
import SettingsPlugin from '@mapstore/plugins/Settings';
import * as SharePlugin from '@mapstore/plugins/Share';
import SnapshotPlugin from '@mapstore/plugins/Snapshot';
import StyleEditorPlugin from '@mapstore/plugins/StyleEditor';
import SwipePlugin from '@mapstore/plugins/Swipe';
import TOCItemsSettingsPlugin from '@mapstore/plugins/TOCItemsSettings';
import TOCPlugin from '@mapstore/plugins/TOC';
import ThematicLayerPlugin from '@mapstore/plugins/ThematicLayer';
// ThemeSwitcherPlugin from '../plugins/ThemeSwitcher'; NOT_NEEDED
import TimelinePlugin from '@mapstore/plugins/Timeline';
import ToolbarPlugin from '@mapstore/plugins/Toolbar';
import TutorialPlugin from '@mapstore/plugins/Tutorial';

import UserExtensionsPlugin from '@mapstore/plugins/UserExtensions';
import UserManagerPlugin from '@mapstore/plugins/manager/UserManager';
import UserSessionPlugin from '@mapstore/plugins/UserSession';
import VersionPlugin from '@mapstore/plugins/Version';
import LayerDownloadPlugin from '@mapstore/plugins/LayerDownload';
import WidgetsBuilderPlugin from '@mapstore/plugins/WidgetsBuilder';
import WidgetsPlugin from '@mapstore/plugins/Widgets';
import WidgetsTrayPlugin from '@mapstore/plugins/WidgetsTray';
import ZoomAllPlugin from '@mapstore/plugins/ZoomAll';
import ZoomInPlugin from '@mapstore/plugins/ZoomIn';
import ZoomOutPlugin from '@mapstore/plugins/ZoomOut';

import ReactSwipe from 'react-swipeable-views';
import SwipeHeader from '@mapstore/components/data/identify/SwipeHeader';

export default {
    plugins: {
        // custom plugins
        AttributionPlugin,
        FeatureLoader,
        FooterPlugin,
        GeoNetworkLinkPlugin,
        HeaderPlugin,
        LoginPlugin,
        LoginModalPlugin,
        PrivacyNote,
        // product plugins
        NavMenu,
        AboutPlugin,
        // framework  plugin
        AddGroupPlugin,
        AnnotationsPlugin,
        AutoMapUpdatePlugin,
        BackgroundSelectorPlugin,

        BurgerMenuPlugin,
        CRSSelectorPlugin,
        ContentTabs,
        ContextPlugin,
        ContextCreatorPlugin,
        ContextManagerPlugin,
        CookiePlugin,
        CreateNewMapPlugin,
        Dashboard,
        DashboardEditor,
        DashboardSavePlugin,
        DashboardSaveAsPlugin,
        DashboardsPlugin,
        DetailsPlugin,
        DrawerMenuPlugin,
        ExpanderPlugin,
        FeatureEditorPlugin,
        FeaturedMaps,
        FeedbackMaskPlugin,
        FilterLayerPlugin,

        FullScreenPlugin,
        GeoStoryPlugin,
        GeoStoriesPlugin,
        GeoStoryEditorPlugin,
        GeoStorySavePlugin,
        GeoStorySaveAsPlugin,
        GeoStoryNavigationPlugin,
        GlobeViewSwitcherPlugin,
        GoFull,

        GroupManagerPlugin,
        HelpLinkPlugin,
        HelpPlugin,
        HomePlugin,
        IdentifyPlugin,
        LanguagePlugin,
        LocatePlugin,
        ManagerMenuPlugin,
        ManagerPlugin,
        MapEditorPlugin,
        MapExportPlugin,
        MapFooterPlugin,
        MapImportPlugin,
        MapLoadingPlugin,
        MapPlugin,
        MapSearchPlugin,
        MapsPlugin,
        MapCatalogPlugin,
        MapTemplatesPlugin,
        MeasurePlugin,
        MediaEditorPlugin,
        MetadataExplorerPlugin,
        MousePositionPlugin,
        NotificationsPlugin,
        OmniBarPlugin,
        PlaybackPlugin,
        PrintPlugin,
        QueryPanelPlugin,
        RedirectPlugin,
        RedoPlugin: History,
        RulesDataGridPlugin,
        RulesEditorPlugin,
        RulesManagerFooter,
        SaveAsPlugin,
        SavePlugin,
        ScaleBoxPlugin,
        ScrollTopPlugin,
        SearchPlugin,
        SearchServicesConfigPlugin,
        SearchByBookmarkPlugin,
        SettingsPlugin,
        SharePlugin,
        SnapshotPlugin,
        StyleEditorPlugin,
        SwipePlugin,
        TOCItemsSettingsPlugin,
        TOCPlugin,
        ThematicLayerPlugin,

        TimelinePlugin,
        ToolbarPlugin,
        TutorialPlugin,
        UndoPlugin: History,
        UserExtensionsPlugin,
        UserManagerPlugin,
        UserSessionPlugin,
        VersionPlugin,
        LayerDownloadPlugin,
        WidgetsBuilderPlugin,
        WidgetsPlugin,
        WidgetsTrayPlugin,
        ZoomAllPlugin,
        ZoomInPlugin,
        ZoomOutPlugin
    },
    requires: {
        ReactSwipe,
        SwipeHeader
    }
};
