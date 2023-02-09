import Knex from 'knex';
import knexfile from '../../knexfile.js';

const env = process.env.NODE_ENV || 'development';
const knex = Knex(knexfile[env]);

export default knex;
