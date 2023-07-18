/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: 'charles', last_name: 'langdon', user_name: 'kerbal', user_password: 'toaster'},
    {id: 2, first_name: 'obiwan', last_name: 'kenobi', user_name: 'highground', user_password: 'dontdoit'},
    {id: 3, first_name: 'anikin', last_name: 'skywalker', user_name: 'vader', user_password: 'ihatesand!'}
  ]);
};
