import calculatePizzaPrice from './calculatePizzaPrice';
import formatCurrency from './formatCurrency';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((p) => p.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image?.asset?.fluid?.src,
      price: formatCurrency(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
