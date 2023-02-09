/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.timestamps(false, true);
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
    })
    .createTable('restaurants', (table) => {
      table.increments('id').primary();
      table.timestamps(false, true);
      table.string('name').notNullable();
      table.string('address').notNullable();
      table.string('type');
    })
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.timestamp('date').defaultTo(knex.fn.now());
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id').onDelete('CASCADE');
      table.integer('restaurant_id').unsigned().notNullable();
      table
        .foreign('restaurant_id')
        .references('restaurants.id')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
    .createTable('order_products', (table) => {
      table.increments('id').primary();
      table.decimal('price').notNullable();
      table.integer('order_id').unsigned().notNullable();
      table.foreign('order_id').references('orders.id').onDelete('CASCADE');
      table.integer('product_id').unsigned().notNullable();
      table.foreign('product_id').references('products.id').onDelete('CASCADE');
      table.timestamps(false, true);
    })
    .createTable('products', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.decimal('price').notNullable();
      table.text('description');
      table.integer('restaurant_id').unsigned().notNullable();
      table
        .foreign('restaurant_id')
        .references('restaurants.id')
        .onDelete('CASCADE');
      table.timestamps(false, true);
    })
    .createTable('deliveries', (table) => {
      table.increments('id').primary();
      table.timestamp('delivery_date');
      table.integer('order_id').unsigned().notNullable();
      table.foreign('order_id').references('orders.id').onDelete('CASCADE');

      table.timestamps(false, true);
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema
    .dropTable('deliveries')
    .dropTable('products')
    .dropTable('order_products')
    .dropTable('orders')
    .dropTable('restaurants')
    .dropTable('users');
}
