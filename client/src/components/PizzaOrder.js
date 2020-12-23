import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatCurrency from '../utils/formatCurrency';

export default function PizzaOrder({ order, pizzas, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find((aPizza) => aPizza.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={pizza.image?.asset?.fluid} alt={pizza.name} />
            <h2>{pizza.name}</h2>
            <p>
              {formatCurrency(
                calculatePizzaPrice(pizza.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
