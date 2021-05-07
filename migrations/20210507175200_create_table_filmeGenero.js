exports.up = function (knex) {
    return knex.schema.createTable("filmeGenero", (table) => {
        table.integer("fk_filme_id").unsigned().notNull();
        table.foreign("fk_filme_id").references("id").inTable("filme").onDelete("CASCADE");
        table.integer("fk_genero_id").unsigned().notNull();
        table.foreign("fk_genero_id").references("id").inTable("genero").onDelete("CASCADE");
        table.unique(['fk_filme_id', 'fk_genero_id']);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("filmeGenero");
  };
  