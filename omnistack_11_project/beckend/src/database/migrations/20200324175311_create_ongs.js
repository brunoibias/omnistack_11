
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table){
      table.string('id').primary();
      table.string('name').notNullable();//notNullable é obrigatorio
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();// o numro depois da virgula define o tamanho esperado da palavra
      

  })
};

exports.down = function(knex) {
 return knex.schema.dropTable('ongs');
};
