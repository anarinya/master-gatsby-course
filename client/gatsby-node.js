const path = require('path');
const fetch = require('isomorphic-fetch');

const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
const toppingTemplate = path.resolve('./src/pages/pizzas.js');
const slicemastersTemplate = path.resolve('./src/pages/slicemasters.js');
const slicemasterTemplate = path.resolve('./src/templates/Slicemaster.js');

export async function turnPizzasIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

export async function turnToppingsIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    console.log('Creating page for topping', topping);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  const data = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await data.json();

  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

export async function turnSlicemastersIntoPages({ graphql, actions }) {
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: slicemasterTemplate,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  Array.from(Array(pageCount).keys(), (k) => k + 1).forEach((i) => {
    actions.createPage({
      path: `/slicemasters/${i}`,
      component: slicemastersTemplate,
      context: {
        skip: (i - 1) * pageSize,
        currentPage: i,
        pageSize,
      },
    });
  });
}

export async function sourceNodes(params) {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
}
