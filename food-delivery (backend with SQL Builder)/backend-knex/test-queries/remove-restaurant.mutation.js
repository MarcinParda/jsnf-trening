import knex from '../src/database/connection.js';

try {
  const result = await knex('restaurants').where({ id: 2 }).del();
  console.log(result);
} catch (e) {
  console.error('Error: ');
  console.error(e);
}
await knex.destroy();
