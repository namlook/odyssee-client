
export default {
  views: {
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
              storedAt: 'collectionQueryFilter',
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
            store: 'collection',
          }],
        },
        statistics: {
          widgets: [
            {
              type: 'chart',
              title: 'here the stats',
              queryFrom: 'collectionQueryFilter',
              dataAt: 'collectionStatisticsChart1',
            },
            {
              type: 'chart',
              title: 'here the stats2',
              queryFrom: 'collectionQueryFilter',
              dataAt: 'collectionStatisticsChart2',
            },
            {
              type: 'map',
              title: 'here the map',
              dataFrom: 'collectionStatisticsChart1',
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
          type: 'text',
          title: "contact",
          store: 'app.scores.collectionQuery',
        },
      ],
    },
  },
};
