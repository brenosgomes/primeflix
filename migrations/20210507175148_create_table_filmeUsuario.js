exports.up = function (knex) {
    return knex.schema.createTable("filmeUsuario", (table) => {
        table.integer("fk_filme_id").unsigned().notNull();
        table.foreign("fk_filme_id").references("id").inTable("filme").onDelete("CASCADE");
        table.integer("fk_usuario_id").unsigned().notNull();
        table.foreign("fk_usuario_id").references("id").inTable("usuario").onDelete("CASCADE");
        table.unique(['fk_filme_id', 'fk_usuario_id']);
        table.date("data").nullable();
        table.float("nota").nullable();
        table.boolean("favorito").nullable();
        table.boolean("assistido").nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("filmeUsuario");
  };
  