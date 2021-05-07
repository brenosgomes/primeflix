exports.up = function (knex) {
    return knex.schema.createTable("equipe", (table) => {
        table.integer("fk_profissional_id").unsigned().notNull();
        table.foreign("fk_profissional_id").references("id").inTable("profissional").onDelete("CASCADE");
        table.integer("fk_cargo_id").unsigned().notNull();
        table.foreign("fk_cargo_id").references("id").inTable("cargo").onDelete("CASCADE");
        table.integer("fk_filme_id").unsigned().notNull();
        table.foreign("fk_filme_id").references("id").inTable("filme").onDelete("CASCADE");
        table.unique(['fk_profissional_id', 'fk_cargo_id', 'fk_filme_id']);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("equipe");
  };
  