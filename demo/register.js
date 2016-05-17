
import * as OrderedCollectionStore from '../lib/businessLogic/OrderedCollectionStore';
import * as CollectionStore from '../lib/businessLogic/CollectionStore';
import * as RecordStore from '../lib/businessLogic/RecordStore';

import * as RecordFormWidget from '../lib/businessLogic/RecordFormWidget';
import * as RecordDisplayWidget from '../lib/businessLogic/RecordDisplayWidget';
import * as FormSubmitWidget from '../lib/businessLogic/FormSubmitWidget';
import * as CollectionListWidget from '../lib/businessLogic/CollectionListWidget';


import * as ScoreFormWidget from '../lib/businessLogic/ScoreFormWidget';
// import * as ScoreCollectionNavbarWidget from '../lib/businessLogic/ScoreCollectionNavbarWidget';
import * as NewRecordWidget from '../lib/businessLogic/NewRecordWidget';
import * as ParticipantsEditWidget from '../lib/businessLogic/ParticipantsEditWidget';
import * as WeatherCheckWidget from '../lib/businessLogic/WeatherCheckWidget';
import * as AreWeOpenWidget from '../lib/businessLogic/AreWeOpenWidget';

import Outlet from '../lib/components/Outlet';
import TextWidget from '../lib/components/widgets/TextWidget';
import ApplicationMenuWidget from '../lib/components/widgets/ApplicationMenuWidget';
import MobileApplicationMenuWidget from
  '../lib/components/widgets/MobileApplicationMenuWidget';
import ApplicationNavbarWidget from '../lib/components/widgets/ApplicationNavbarWidget';
import MenuWidget from '../lib/components/widgets/MenuWidget';
import HeaderWidget from '../lib/components/widgets/HeaderWidget';

import NotFoundWidget from '../lib/components/contrib/NotFoundWidget';

export default {
  stores: {
    OrderedCollectionStore,
    CollectionStore,
    RecordStore,
  },
  widgets: {
    RecordFormWidget,
    RecordDisplayWidget,

    ScoreFormWidget,
    // ScoreCollectionNavbarWidget,
    NewRecordWidget,
    FormSubmitWidget,
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
