/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: 1, user_id: 1, item_name: 'helmet', flavor_text: 'the helmet of the pink knight', quantity: 1},
    {id: 2, user_id: 2, item_name: 'light sabor', flavor_text: 'a tool of the jedi', quantity: 1},
    {id: 3, user_id: 3, item_name: 'mask', flavor_text: 'the mask keeping vader alive', quantity: 1},
  ]);
};
