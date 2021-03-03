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
import LavoriPubbliciPlugin from './plugins/LavoriPubblici';
// framework plugins
import BackgroundSelectorPlugin from '@mapstore/plugins/BackgroundSelector';
import BurgerMenuPlugin from '@mapstore/plugins/BurgerMenu';
import DrawerMenuPlugin from '@mapstore/plugins/DrawerMenu';
import FeedbackMaskPlugin from '@mapstore/plugins/FeedbackMask';
import HelpPlugin from '@mapstore/plugins/Help';
import LanguagePlugin from '@mapstore/plugins/Language';
import LocatePlugin from '@mapstore/plugins/Locate';
import LoginPlugin from '@mapstore/plugins/Login';
import MapLoadingPlugin from '@mapstore/plugins/MapLoading';
import MapPlugin from '@mapstore/plugins/Map';
import MapSearchPlugin from '@mapstore/plugins/MapSearch';
import MapsPlugin from '@mapstore/plugins/Maps';
import NotificationsPlugin from '@mapstore/plugins/Notifications';
import OmniBarPlugin from '@mapstore/plugins/OmniBar';
import RedirectPlugin from '@mapstore/plugins/Redirect';
import History from '@mapstore/plugins/History';
import SearchPlugin from '@mapstore/plugins/Search';
import SearchServicesConfig from '@mapstore/plugins/SearchServicesConfig';
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
        LavoriPubbliciPlugin,
        // framework plugins
        BackgroundSelectorPlugin,
        BurgerMenuPlugin,
        DrawerMenuPlugin,
        FeedbackMaskPlugin,
        HelpPlugin,
        LanguagePlugin,
        LocatePlugin,
        LoginPlugin,
        MapLoadingPlugin,
        MapPlugin,
        MapSearchPlugin,
        MapsPlugin,
        NotificationsPlugin,
        OmniBarPlugin,
        RedirectPlugin,
        RedoPlugin: History,
        SearchPlugin,
        SearchServicesConfig,
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
