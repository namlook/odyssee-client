
const color = 'violet';

// export const application = {
//   outlet: {},
//   participants: {
//     path: 'participants',
//   },
//   contact: {
//     path: 'contact',
//   },
// };
//
// export const scores = {
//   outlet: {},
//   hallOfFames: {
//     path: 'hall-of-fames',
//   },
//   statistics: {
//     path: 'statistics',
//   },
// };
//
// export const router = {
//   application: { ...application, path: '/', index: { redirect: 'scores.index' } },
//   scores: { ...scores, path: '/scores' },
// };
//

// export const structure = {
//   routes: {
//     outlet: {
//       page: 'application.outlet',
//       path: '/',
//     },
//     index: {
//       page: 'application.index',
//       path: '/',
//     },
//     participants: {
//       page: 'application.participants',
//       path: 'participants',
//     },
//     scores: {
//       outlet: {
//         page: 'application.scores.outlet',
//         path: 'scores',
//       },
//       index: {
//         page: 'scores.index',
//       },
//       hallOfFames: {
//         page: 'scores.hallOfFames',
//         path: 'hall-of-fames',
//       },
//       statistics: {
//         page: 'scores.statistics',
//         path: 'statistics',
//       },
//     },
//   },
// };


export default {
  // stores: {
    // participants: [
  stores: [
    {
      type: 'ordered-collection',
      name: 'participants-store',
      recordSchema: {
        _id: null,
        name: null,
        position: null,
      },
    },
    {
      type: 'collection',
      name: 'scores-store',
      recordSchema: {
        _id: null,
        participantId: null,
        lap: null,
        score: null,
      },
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
      path: '/',
      widgets: [
        {
          layout: { mobile: 16 },
          type: 'application-navbar',
          title: 'Scora',
          color,
        },
        {
          layout: { mobile: 0, tablet: 0, computer: 3 },
          type: 'application-menu',
          color,
          items: [
            { label: 'Participants', route: '/participants', icon: 'users' },
            { label: 'Scores', route: '', items: [
              { label: 'Scores', route: '/scores', icon: 'game' },
              { label: 'Hall Of Fames', route: '/scores/hall-of-fames', icon: 'game' },
              { label: 'Statistics', route: '/scores/statistics', icon: 'line chart' },
            ] },
            { label: 'Statistics', route: '/scores/stats', icon: 'chart line' },
            { label: 'Contact', route: '/contact', icon: 'user' },
          ],
        },
        {
          layout: { mobile: 16, tablet: 16, computer: 13 },
          type: 'outlet',
        },
        {
          type: 'mobile-application-menu',
          layout: { mobile: 16, table: 16, computer: 0 },
          color,
          items: [
            { label: 'Participants', route: '/participants', icon: 'users' },
            { label: 'Scores', route: '/scores', icon: 'game' },
            { label: 'Statistics', route: '/scores/stats', icon: 'chart line' },
            { label: 'Contact', route: '/contact', icon: 'user' },
          ],
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
      path: 'participants',
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
          icon: 'smile',
          color: 'teal',
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
    scores: {
      outlet: {
        path: 'scores',
        widgets: [
          {
            type: 'menu',
            title: 'Scores',
          },
          {
            type: 'outlet',
          },
        ],
      },
      index: {
        widgets: [
          {
            type: 'collection-list',
            name: 'scores-list',
            title: 'Les scores',
            link: {
              collection: { to: 'records', from: 'scores-store' },
            },
          },
        ],
      },
      hallOfFames: {
        path: 'hall-of-fames',
        widgets: [
          {
            type: 'text',
            title: 'prochainement',
            content: 'le hall of fame !!!',
          },
        ],
      },
      statistics: {
        path: 'statistics',
        widgets: [
          {
            type: 'text',
            title: 'prochainement',
            content: 'de zolis graphe ici <3',
          },
        ],
      },
    },
    contact: {
      path: 'contact',
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
    404: {
      path: '*',
      widgets: [
        {
          type: 'not-found',
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
