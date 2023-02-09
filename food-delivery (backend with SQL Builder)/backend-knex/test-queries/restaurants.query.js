import knex from '../src/database/connection.js';

const restaurants = await knex('restaurants').select('*');

await knex.destroy();

console.log(restaurants);
