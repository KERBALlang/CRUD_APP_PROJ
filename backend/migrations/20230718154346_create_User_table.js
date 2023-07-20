/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table){
        table.increments();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('user_name').unique().notNullable();
        table.string('user_password').notNullable();

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
