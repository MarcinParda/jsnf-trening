import bcrypt from 'bcryptjs';

const genPassword = () => bcrypt.hash('s4ampl3Pa55word', 12);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('deliveries').del();
  await knex('order_products').del();
  await knex('orders').del();
  await knex('products').del();
  await knex('restaurants').del();
  await knex('users').del();

  await knex('users').insert([
    { id: 1, email: 'admin@fooddelivery.com', password: await genPassword() },
    { id: 2, email: 'user@fooddelivery.com', password: await genPassword() },
  ]);
  await knex('restaurants').del([
    {
      id: 1,
      name: 'Restaurant 1',
      address: 'Address 1',
      type: 'Restaurant',
    },
    {
      id: 2,
      name: 'Restaurant 2',
      address: 'Address 2',
      type: 'Fast food',
    },
  ]);
  await knex('products').del(
    {
      id: 1,
      name: 'Maki',
      price: 10,
      restaurant_id: 1,
      descriotion: '24 rolls',
    },
    {
      id: 2,
      name: 'Kebab',
      price: 20,
      restaurant_id: 2,
      descriotion: 'Średni',
    },
    {
      id: 3,
      name: 'Burger',
      price: 20,
      restaurant_id: 2,
      descriotion: 'Średni',
    },
    {
      id: 4,
      name: 'Sushi',
      price: 100,
      restaurant_id: 1,
      descriotion: '20 rolls',
    }
  );
  await knex('orders').del([
    {
      id: 1,
      date: new Date(),
      user_id: 1,
      restaurant_id: 1,
    },
    {
      id: 2,
      date: new Date(),
      user_id: 2,
      restaurant_id: 2,
    },
  ]);
  await knex('order_products').del([
    {
      order_id: 1,
      product_id: 1,
      price: 9.9,
    },
    {
      order_id: 1,
      product_id: 4,
      price: 20,
    },
    {
      order_id: 2,
      product_id: 2,
      price: 19,
    },
  ]);
  await knex('deliveries').del([
    {
      delivery_date: new Date(),
      order_id: 2,
    },
  ]);
}
