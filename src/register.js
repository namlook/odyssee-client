
import * as OrderedCollectionStore from './businessLogic/OrderedCollectionStore';

import * as NewRecordWidget from './businessLogic/NewRecordWidget';
import * as ParticipantsEditWidget from './businessLogic/ParticipantsEditWidget';
import * as WeatherCheckWidget from './businessLogic/WeatherCheckWidget';
import * as AreWeOpenWidget from './businessLogic/AreWeOpenWidget';
import * as CollectionListWidget from './businessLogic/CollectionListWidget';

import Outlet from './core/components/Outlet.jsx';
import TextWidget from './core/components/widgets/TextWidget.jsx';
import ApplicationMenuWidget from './core/components/widgets/ApplicationMenuWidget.jsx';
import MobileApplicationMenuWidget from './core/components/widgets/MobileApplicationMenuWidget.jsx';
import ApplicationNavbarWidget from './core/components/widgets/ApplicationNavbarWidget.jsx';
import MenuWidget from './core/components/widgets/MenuWidget.jsx';
import HeaderWidget from './core/components/widgets/HeaderWidget.jsx';

import NotFoundWidget from './core/components/contrib/NotFoundWidget.jsx';

export default {
  stores: {
    OrderedCollectionStore,
  },
  widgets: {
    NewRecordWidget,
    ParticipantsEditWidget,
    WeatherCheckWidget,
    AreWeOpenWidget,
    CollectionListWidget,

    OutletWidget: { Component: Outlet },
    TextWidget: { Component: TextWidget },
    HeaderWidget: { Component: HeaderWidget },
    MobileApplicationMenuWidget: { Component: MobileApplicationMenuWidget },
    ApplicationMenuWidget: { Component: ApplicationMenuWidget },
    ApplicationNavbarWidget: { Component: ApplicationNavbarWidget },
    MenuWidget: { Component: MenuWidget },

    NotFoundWidget: { Component: NotFoundWidget },
  },
};
