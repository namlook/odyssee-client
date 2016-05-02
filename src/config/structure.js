
export default {
  stores: {
    participants: [
      {
        type: 'CollectionStore',
        name: 'participants-store',
      },
      {
        type: 'CollectionPositionStore',
        name: 'participant-positions-store',
        link: {
          collection: { to: 'records', from: 'participants-store' },
        },
      },
    ],
    scores: [
      {
        type: 'ResourceCollectionStore',
        name: 'score-records',
      },
      {
        type: 'ScoreLocationStore',
        name: 'score-location-records',
      },
    ],
  },
  pages: {
    outlet: {
      widgets: [
        {
          layout: { mobile: 16 },
          type: 'application-navbar',
          title: "Scora",
        },
        {
          layout: { mobile: 0, tablet: 6, computer: 6 },
          type: 'application-menu',
        },
        {
          layout: { mobile: 16, tablet: 10, computer: 10 },
          type: 'outlet',
        },
      ],
    },
    index: {
      widgets: [
        {
          type: 'placeholder',
          title: "index",
        },
      ],
    },
    participants: {
      widgets: [
        {
          type: 'record-new',
          linkedStates: {
            collection: 'participants-store',
          },
          on: {
            save: { trigger: 'addRecord', on: 'participants-store' },
          },
        },
        {
          type: 'participants-edit-list',
          // link: [
          //   { stateOf: 'participants-store', as: 'records' },
          // ],
          linkedStates: {
            collection: 'participants-store',
            positions: 'participant-positions-store',
          },
          on: {
            rename: { trigger: 'updateRecord', on: 'participants-store' },
            delete: { trigger: 'deleteRecord', on: 'participants-store' },
            moveUp: { trigger: 'moveUp', on: 'participant-positions-store' },
            moveDown: { trigger: 'moveDown', on: 'participant-positions-store' },
          },
        },
      ],
    },
    scores: {
      __meta__: {
        // indexRedirect: 'collection.index',
      },
      collection: {
        outlet: {
          store: 'collection',
          widgets: [
            {
              type: 'menu',
              title: "Scores",
            },
            {
              type: 'query-filter',
              name: 'query-filter',
              onChange: {
                'score-location-records': 'reload',
              },
            },
            {
              type: 'outlet',
            },
          ],
        },
        index: {
          widgets: [{
            type: 'text',
            title: 'Hall of Fame',
            recordsStore: 'score-records',
          }],
        },
        statistics: {
          widgets: [
            {
              type: 'chart',
              title: 'here the stats',
              recordsStore: 'score-records',
            },
            {
              type: 'chart',
              title: 'here the stats2',
              recordsStore: 'score-records',
            },
            {
              type: 'map',
              title: 'here the map',
              recordsStore: 'score-location-records',
            },
          ],
        },
      },
      model: {
        edit: {
          widgets: [{
            type: 'text',
            title: 'here editing text',
          }],
        },
      },
    },
    contact: {
      widgets: [
        {
          type: 'WeatherCheckWidget',
          name: 'weather-in-montpellier',
          city: 'Montpellier',
        },
        {
          type: 'AreWeOpenWidget',
          title: "Are we open ?",
          link: {
            currentWeather: { to: 'currentWeather', from: 'weather-in-montpellier' },
          },
        },
        {
          type: 'NewRecordWidget',
          name: 'add-participant',
          on: {
            save: { trigger: 'addRecord', on: 'participant-store' },
          },
        },
      ],
    },
  },
};
