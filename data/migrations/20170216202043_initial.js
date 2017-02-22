'use strict';

exports.up = function (knex) {
  return knex.schema
    .createTable('User', function (table) {
      table.increments('id').primary();
      table.string('nickname').index().unique().notNullable();
      table.json('aliases');
      table.timestamp('updatedAt');
    })
    .createTable('UserAction', function (table) {
      table.increments('id').primary();
      table.timestamp('createdAt').index().notNullable().defaultTo(knex.raw('now()'));
      table.integer('userId').unsigned().index().references('id').inTable('User');
      table.string('action').index(); // enum (defined in model)
    })
    .createTable('Substance', function (table) {
      table.increments('id').primary();
      table.string('substanceType'); // enum (defined in model)
      table.json('aliases');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('User')
    .dropTableIfExists('UserAction')
    .dropTableIfExists('Substance');
};
