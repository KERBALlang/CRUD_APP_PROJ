/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', function(table){
        table.increments();
        table.integer('user_id').references('id').inTable('users');
        table.string('item_name').notNullable();
        table.string('flavor_text').notNullable();
        table.integer('quantity').notNullable();

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('items');
  
};
