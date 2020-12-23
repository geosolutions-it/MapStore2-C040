/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


// custom plugins
import AttributionPlugin from './plugins/Attribution';
import FeatureLoader from './plugins/FeatureLoader';
// framework plugins
import BurgerMenuPlugin from '@mapstore/plugins/BurgerMenu';
import CreateNewMapPlugin from '@mapstore/plugins/CreateNewMap';
import DrawerMenuPlugin from '@mapstore/plugins/DrawerMenu';
import DetailsPlugin from '@mapstore/plugins/Details';
import ExpanderPlugin from '@mapstore/plugins/Expander';
import HelpPlugin from '@mapstore/plugins/Help';
import HomePlugin from '@mapstore/plugins/Home';
import IdentifyPlugin from '@mapstore/plugins/Identify';
import LanguagePlugin from '@mapstore/plugins/Language';
import LocatePlugin from '@mapstore/plugins/Locate';
import LoginPlugin from '@mapstore/plugins/Login';
import MapFooter from '@mapstore/plugins/MapFooter';
import MapLoadingPlugin from '@mapstore/plugins/MapLoading';
import MapPlugin from '@mapstore/plugins/Map';
import MapSearchPlugin from '@mapstore/plugins/MapSearch';
import MapsPlugin from '@mapstore/plugins/Maps';
import MeasurePlugin from '@mapstore/plugins/Measure';
import MeasureResultsPlugin from '@mapstore/plugins/MeasureResults';
import MetadataExplorerPlugin from '@mapstore/plugins/MetadataExplorer';
import MousePositionPlugin from '@mapstore/plugins/MousePosition';
import NotificationsPlugin from '@mapstore/plugins/Notifications';
import OmniBarPlugin from '@mapstore/plugins/OmniBar';
import PrintPlugin from '@mapstore/plugins/Print';
import QueryPanelPlugin from '@mapstore/plugins/QueryPanel';
import RedirectPlugin from '@mapstore/plugins/Redirect';
import History from '@mapstore/plugins/History';
import SaveAsPlugin from '@mapstore/plugins/SaveAs';
import SavePlugin from '@mapstore/plugins/Save';
import ScaleBoxPlugin from '@mapstore/plugins/ScaleBox';
import SearchPlugin from '@mapstore/plugins/Search';
import SettingsPlugin from '@mapstore/plugins/Settings';
import * as SharePlugin from '@mapstore/plugins/Share';
import SnapshotPlugin from '@mapstore/plugins/Snapshot';
import TOCPlugin from '@mapstore/plugins/TOC';
import ToolbarPlugin from '@mapstore/plugins/Toolbar';
import TutorialPlugin from '@mapstore/plugins/Tutorial';
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
        // framework plugins
        BurgerMenuPlugin,
        CreateNewMapPlugin,
        DrawerMenuPlugin,
        DetailsPlugin,
        ExpanderPlugin,
        HelpPlugin,
        HomePlugin,
        IdentifyPlugin,
        LanguagePlugin,
        LocatePlugin,
        LoginPlugin,
        MapFooter,
        MapLoadingPlugin,
        MapPlugin,
        MapSearchPlugin,
        MapsPlugin,
        MeasurePlugin,
        MeasureResultsPlugin,
        MetadataExplorerPlugin,
        MousePositionPlugin,
        NotificationsPlugin,
        OmniBarPlugin,
        PrintPlugin,
        QueryPanelPlugin,
        RedirectPlugin,
        RedoPlugi: History,
        SaveAsPlugin,
        SavePlugin,
        ScaleBoxPlugin,
        SearchPlugin,
        SettingsPlugin,
        SharePlugin,
        SnapshotPlugin,
        TOCPlugin,
        ToolbarPlugin,
        TutorialPlugin,
        UndoPlugin: History,
        ZoomAllPlugin,
        ZoomInPlugin,
        ZoomOutPlugin
    },
    requires: {
        ReactSwipe,
        SwipeHeader
    }
};
