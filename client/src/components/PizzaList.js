import React from 'react';
import styled from 'styled-components';
import PizzaListItem from './PizzaListItem';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaList = ({ pizzas }) => (
  <PizzaGridStyles>
    {pizzas.map((pizza) => (
      <PizzaListItem pizza={pizza} key={pizza.id} />
    ))}
  </PizzaGridStyles>
);

export default PizzaList;
