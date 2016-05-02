
export default {
  // stores: {
    // participants: [
  stores: [
    {
      type: 'ordered-collection',
      name: 'participants-store',
    },
    // {
    //   type: 'collection',
    //   name: 'participant-positions-store',
    //   link: {
    //     collection: { to: 'records', from: 'participants-store' },
    //   },
    // },
  ],
    // scores: [
    //   {
    //     type: 'ResourceCollectionStore',
    //     name: 'score-records',
    //   },
    //   {
    //     type: 'ScoreLocationStore',
    //     name: 'score-location-records',
    //   },
    // ],
  // },
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
          type: 'text',
          title: 'index',
          content: 'coucou',
        },
      ],
    },
    participants: {
      widgets: [
        {
          type: 'menu',
          title: 'participants',
        },
        {
          type: 'new-record',
          title: 'add participants',
          name: 'add-participant',
          link: {
            collection: { to: 'records', from: 'participants-store' },
          },
          on: {
            save: { dispatch: 'addRecord', on: 'participants-store' },
          },
        },
        {
          type: 'header',
          title: 'booh',
          subtitle: 'ahaha',
        },
        {
          type: 'participants-edit',
          name: 'participants-edit-list',
          title: 'all the participants',
          icon: 'users',
          link: {
            collection: { to: 'records', from: 'participants-store' },
          },
          on: {
            rename: { dispatch: 'updateRecord', on: 'participants-store' },
            delete: { dispatch: 'deleteRecord', on: 'participants-store' },
            moveUp: { dispatch: 'moveUp', on: 'participants-store' },
            moveDown: { dispatch: 'moveDown', on: 'participants-store' },
          },
        },
      ],
    },
    contact: {
      widgets: [
        {
          type: 'menu',
          title: 'Contact',
        },
        {
          type: 'text',
          title: 'how to contact us ?',
          content: "you'll find the map here",
        },
        {
          type: 'weather-check',
          name: 'weather-in-montpellier',
          title: 'current weather',
        },
        {
          type: 'are-we-open',
          title: 'are we open ?',
          name: 'contact-are-we-open',
          link: {
            currentWeather: { to: 'currentWeather', from: 'weather-in-montpellier' },
          },
        },
        {
          type: 'new-record',
          title: 'add participants',
          name: 'add-participant',
          link: {
            collection: { to: 'records', from: 'participants-store' },
          },
          on: {
            save: { dispatch: 'addRecord', on: 'participants-store' },
          },
        },
        {
          type: 'collection-list',
          name: 'participants-list',
          title: 'here are the participants',
          link: {
            collection: { to: 'records', from: 'participants-store' },
          },
        },
      ],
    },
    // scores: {
    //   collection: {
    //     outlet: {
    //       store: 'collection',
    //       widgets: [
    //         {
    //           type: 'menu',
    //           title: "Scores",
    //         },
    //         {
    //           type: 'query-filter',
    //           name: 'query-filter',
    //           onChange: {
    //             'score-location-records': 'reload',
    //           },
    //         },
    //         {
    //           type: 'outlet',
    //         },
    //       ],
    //     },
    //     index: {
    //       widgets: [{
    //         type: 'text',
    //         title: 'Hall of Fame',
    //         recordsStore: 'score-records',
    //       }],
    //     },
    //     statistics: {
    //       widgets: [
    //         {
    //           type: 'chart',
    //           title: 'here the stats',
    //           recordsStore: 'score-records',
    //         },
    //         {
    //           type: 'chart',
    //           title: 'here the stats2',
    //           recordsStore: 'score-records',
    //         },
    //         {
    //           type: 'map',
    //           title: 'here the map',
    //           recordsStore: 'score-location-records',
    //         },
    //       ],
    //     },
    //   },
    //   model: {
    //     edit: {
    //       widgets: [{
    //         type: 'text',
    //         title: 'here editing text',
    //       }],
    //     },
    //   },
    // },
    // contact: {
    //   widgets: [
    //     {
    //       type: 'WeatherCheckWidget',
    //       name: 'weather-in-montpellier',
    //       city: 'Montpellier',
    //     },
    //     {
    //       type: 'AreWeOpenWidget',
    //       title: "Are we open ?",
    //       link: {
    //         currentWeather: { to: 'currentWeather', from: 'weather-in-montpellier' },
    //       },
    //     },
    //     {
    //       type: 'NewRecordWidget',
    //       name: 'add-participant',
    //       on: {
    //         save: { trigger: 'addRecord', on: 'participant-store' },
    //       },
    //     },
    //   ],
    // },
  },
};
