import { useState, useContext } from 'react';
import formatCurrency from './formatCurrency';
import calculateOrderTotal from './calculateOrderTotal';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';

export default function usePizza({ pizzas, values }) {
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatCurrency(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    };

    const response = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const text = JSON.parse(await response.text());

    if (response.status >= 400 && response.status < 600) {
      setLoading(false);
      setError(text.message);
    } else {
      setLoading(false);
      setMessage('Success! Come on down for your pizza!');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
}
