import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql, Link } from 'gatsby';

const countPizzasWithToppings = (pizzas) => {
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      const { id, name } = topping;
      const existingTopping = acc[topping.id];

      if (existingTopping) existingTopping.count += 1;
      else acc[topping.id] = { id, name, count: 1 };
      return acc;
    }, {});

  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );

  return sortedToppings;
};

const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        toppings {
          name
          id
        }
      }
    }
  }
`;

const ToppingsFilterStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--gray);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.4vw, 2.5rem);

    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

export default function ToppingsFilter() {
  const { pizzas } = useStaticQuery(query);
  const toppingsWithCounts = countPizzasWithToppings(pizzas.nodes);

  return (
    <ToppingsFilterStyles>
      <Link to="/pizzas">
        <span name="all">All</span>
        <span name="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsFilterStyles>
  );
}
