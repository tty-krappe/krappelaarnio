'use strict';

exports.up = function (knex) {
  return knex.schema
    .table('UserAction'), function (table) {
      table.json('meta');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('UserAction', function (table) {
      table.dropColumn('meta');
    });
};
