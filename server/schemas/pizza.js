import { MdLocalPizza as icon } from 'react-icons/md';
import PriceInput from '../components/PriceInput';
import topping from './topping';

export default {
  name: 'pizza',
  title: 'Pizzas',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza Name',
      type: 'string',
      description: 'What is the name of the pizza?',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      inputComponent: PriceInput,
      description:
        'What is the price of the pizza, in cents? Ex: 1000 cents = $10.00',
      validation: (Rule) => Rule.min(1000).max(50000),
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'Is the pizza vegetarian?',
      options: {
        layout: 'checkbox',
      },
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topping' }] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ title, media, vegetarian, ...toppings }) => {
      const toppingList = Object.values(toppings).filter(Boolean).join(', ');

      return {
        title: `${title} ${vegetarian ? '🌱' : ''}`,
        media,
        subtitle: toppingList,
      };
    },
  },
};
