
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
        _id: '',
        name: '',
      },
    },
    {
      type: 'record',
      name: 'participant-form-store',
      schema: {
        _id: 'string',
        name: 'string',
      },
    },
    // {
    //   type: 'record',
    //   name: 'score-form-store',
    //   schema: {
    //     _id: '',
    //     participant: '',
    //     at: '',
    //     score: '',
    //   },
    // },
    {
      type: 'collection',
      name: 'scores-store',
      recordSchema: {
        _id: '',
        participant: '',
        lap: '',
        score: '',
      },
    },
    {
      type: 'record',
      name: 'score-store',
      schema: {
        _id: 'string',
        participant: 'string',
        score: 'number',
        lap: 'number',
      },
    },
    {
      type: 'record',
      name: 'score-search-store',
      schema: {
        value: 'string',
      },
    },
    // {
    //   type: 'record',
    //   name: 'score-form-store',
    //   schema: {
    //     _id: 'string',
    //     participant: 'string',
    //     at: 'number',
    //     score: 'string',
    //   },
    // },
    // {
    //   type: 'collection',
    //   name: 'participant-positions-store',
    //   linkedStores: {
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
              { label: 'Saisie', route: '/scores', icon: 'game' },
              { label: 'Hall Of Fames', route: '/scores/hall-of-fames', icon: 'trophy' },
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
          type: 'record-form',
          title: 'add participants',
          fields: [
            { name: 'name', type: 'text', label: 'name' },
          ],
          displaySubmitButtons: true,
          linkedStores: {
            own: 'participant-form-store',
            collection: 'participants-store',
          },
        },
        {
          type: 'participants-edit',
          title: 'all the participants',
          icon: 'users',
          linkedStores: {
            participants: 'participants-store',
          },
          // on: {
          //   rename: { dispatch: 'updateRecord', on: 'participants-store' },
          //   delete: { dispatch: 'deleteRecord', on: 'participants-store' },
          //   moveUp: { dispatch: 'moveUp', on: 'participants-store' },
          //   moveDown: { dispatch: 'moveDown', on: 'participants-store' },
          // },
        },
      ],
    },
    scores: {
      outlet: {
        path: 'scores',
        widgets: [
          {
            type: 'outlet',
          },
        ],
      },
      new: {
        path: 'i/new',
        widgets: [
          {
            type: 'record-form',
            title: 'add scores',
            fields: [
              { name: 'participant', type: 'search', label: 'participant' },
              { name: 'score', type: 'number', label: 'score' },
              { name: 'lap', type: 'number', label: 'tour' },
            ],
            displaySubmitButtons: true,
            onSaveRedirectTo: '/scores',
            onCancelRedirectTo: '/scores',
            store: {
              name: 'score-new-form',
              schema: {
                _id: 'string',
                participant: 'string',
                score: 'number',
                lap: 'number',
              },
            },
            linkedStores: {
              // form: 'score-form-store',
              collection: 'scores-store',
            },
          },
        ],
      },
      record: {
        outlet: {
          path: ':id',
          // initStores: {
          //   'score-store': {
          //     from: 'scores-store',
          //     query: { filter: { _id: ':id' } },
          //   },
          // },
          widgets: [
            {
              type: 'menu',
              title: 'Scores',
              icon: 'cube',
              items: [
                { label: 'show', route: '/scores/:id', icon: 'document' },
                { label: 'edit', route: '/scores/:id/edit', icon: 'pencil' },
              ],
            },
            // {
            //   type: 'not-found-redirection'
            //   // TODO handle 404 here ?
            // },
            {
              type: 'outlet',
            },
          ],
        },
        index: {
          widgets: [
            {
              type: 'record-display',
              routeParamsMapping: { _id: ':id' },
              // store: {
              //   name: 'score-display',
              //   schema: {
              //     _id: 'string',
              //     participant: 'string',
              //     score: 'number',
              //     lap: 'number',
              //   },
              // },
              linkedStores: {
                // record: {
                //   name: 'score-store',
                //   bootstrap: {
                //     from: 'scores-store',
                //     query: { filter: { _id: ':id' } },
                //   },
                // },
                own: 'score-store',
                collection: 'scores-store',
              },
              fields: [
                { name: 'participant', type: 'text', label: 'participant' },
                { name: 'score', type: 'number', label: 'score' },
                { name: 'lap', type: 'number', label: 'tour' },
              ],
            },
          ],
        },
        edit: {
          path: 'edit',
          widgets: [
            {
              type: 'record-form',
              routeParamsMapping: { _id: ':id' },
              // store: {
              //   name: 'score-edit',
              //   schema: {
              //     _id: 'string',
              //     participant: 'string',
              //     score: 'number',
              //     lap: 'number',
              //   },
              // },
              fields: [
                { name: 'participant', type: 'search', label: 'participant' },
                { name: 'score', type: 'number', label: 'score' },
                { name: 'lap', type: 'number', label: 'tour' },
              ],
              onSaveRedirectTo: '/scores/:id',
              onCancelRedirectTo: '/scores/:id',
              displaySubmitButtons: true,
              linkedStores: {
                own: 'score-store',
                collection: 'scores-store',
              },
            },
          ],
        },
      },
      collection: {
        outlet: {
          widgets: [
            {
              type: 'menu',
              title: 'Scores',
              icon: 'cubes',
              items: [
                { label: 'create', route: '/scores/winner', icon: 'plus' },
              ],
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
              title: 'Les scores',
              unstackable: true,
              color: 'teal',
              icon: 'users',
              subtitle: 'Que le meilleur gagne',
              properties: ['_id', 'participant', 'score', 'lap'],
              searchProperty: 'participant',
              onClickRedirectTo: '/scores/:id',
              linkedStores: {
                own: 'scores-store',
              },
            },
          ],
        },
        winner: {
          path: 'winner(/:id)',
          widgets: [
            {
              type: 'record-form',
              fields: [
                { name: 'value', type: 'text', label: 'search' },
              ],
              linkedStores: {
                own: 'score-search-store',
              },
            },
            {
              type: 'collection-list',
              routeParamsMapping: { participant: '?name' },
              title: 'Les scores',
              unstackable: true,
              color: 'teal',
              icon: 'users',
              subtitle: 'Que le meilleur gagne',
              properties: ['_id', 'participant', 'score', 'lap'],
              searchProperty: 'participant',
              onClickRedirectTo: '/scores/winner/:id',
              linkedStores: {
                own: 'scores-store',
                search: 'score-search-store',
              },
              // on: {
              //   recordClicked: { action: 'update', store: 'score-store' },
              // },
            },
            {
              layout: { mobile: 8 },
              type: 'record-display',
              routeParamsMapping: { _id: ':id' },
              // store: {
              //   name: 'score-display',
              //   schema: {
              //     _id: 'string',
              //     participant: 'string',
              //     score: 'number',
              //     lap: 'number',
              //   },
              // },
              linkedStores: {
                // record: {
                //   name: 'score-store',
                //   bootstrap: {
                //     from: 'scores-store',
                //     query: { filter: { _id: ':id' } },
                //   },
                // },
                own: 'score-store',
                collection: 'scores-store',
              },
              fields: [
                { name: 'participant', type: 'text', label: 'participant' },
                { name: 'score', type: 'number', label: 'score' },
                { name: 'lap', type: 'number', label: 'tour' },
              ],
            },
            {
              layout: { mobile: 8 },
              type: 'record-form',
              routeParamsMapping: { _id: ':id' },
              // store: {
              //   name: 'score-edit',
              //   schema: {
              //     _id: 'string',
              //     participant: 'string',
              //     score: 'number',
              //     lap: 'number',
              //   },
              // },
              fields: [
                { name: 'participant', type: 'search', label: 'participant' },
                { name: 'score', type: 'number', label: 'score' },
                { name: 'lap', type: 'number', label: 'tour' },
              ],
              onSaveRedirectTo: '/scores/winner',
              onCancelRedirectTo: '/scores/winner',
              displaySubmitButtons: true,
              linkedStores: {
                own: 'score-store',
                collection: 'scores-store',
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
          store: {
            name: 'weather-in-montpellier',
          },
          title: 'current weather',
        },
        {
          type: 'are-we-open',
          title: 'are we open ?',
          linkedStores: {
            weather: 'weather-in-montpellier',
          },
        },
        {
          type: 'record-form',
          title: 'add participants',
          fields: [
            { name: 'name', type: 'text' },
          ],
          displaySubmitButtons: true,
          linkedStores: {
            own: 'participant-form-store',
            collection: 'participants-store',
          },
          // on: {
          //   change: { dispatch: 'updateProperty', on: 'participant-form-store' },
          //   clear: { dispatch: 'clear', on: 'participant-form-store' },
          //   save: { dispatch: 'addRecord', on: 'participants-store' },
          // },
        },
        {
          type: 'collection-list',
          name: 'participants-list',
          title: 'here are the participants',
          properties: ['name'],
          linkedStores: {
            own: 'participants-store',
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
    //       linkedStores: {
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
