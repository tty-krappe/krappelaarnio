'use strict';

exports.up = function (knex) {
  return knex.schema
    .table('UserAction', function (table) {
      table.integer('substanceId').unsigned().index().references('id').inTable('Substance');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('UserAction', function (table) {
      table.dropColumn('substanceId');
    });
};
