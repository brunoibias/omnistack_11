
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
        table.string('title').notNullable();//notNullable é obrigatorio
        table.string('description').notNullable();
        table.decimal('value').notNullable();// decimal é numero
        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');//'ong_id' refencia o 'id' de 'ongs'
    });  
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
