
export default {
  views: {
    __parent__: {
      widgets: [
        {
          layout: { mobile: 0, tablet: 16 },
          type: 'placeholder',
          title: "app navbar",
          color: 'red',
        },
        {
          layout: { mobile: 0, tablet: 6, computer: 6 },
          type: 'placeholder',
          title: "menu",
          color: 'blue',
        },
        {
          layout: { mobile: 16, tablet: 10, computer: 10 },
          type: 'outlet',
          color: 'green',
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
    about: {
      __meta__: {
        index: 'product',
      },
      __parent__: {
        widgets: [
          {
            type: 'placeholder',
            style: 'center aligned',
            title: "about",
          },
          {
            type: 'outlet',
          },
        ],
      },
      team: {
        widgets: [{
          type: 'placeholder',
          title: 'the team',
        }],
      },
      product: {
        widgets: [
          {
            type: 'placeholder',
            title: 'hello',
          },
          {
            type: 'cards',
            layout: 2,
            widgets: [
              {
                type: 'card',
                title: 'the product',
              },
              {
                type: 'card',
                title: 'yeah',
              },
            ],
          },
        ],
      },
    },
    contact: {
      widgets: [
        {
          type: 'placeholder',
          title: "contact",
        },
      ],
    },
  },
};
