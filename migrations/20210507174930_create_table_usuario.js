exports.up = function (knex) {
    return knex.schema.createTable("usuario", (table) => {
      table.increments("id").primary();
      table.string("nome").notNull();
      table.string("senha").notNull();
      table.integer("tempoTotal").nullable();
      table.string("email").notNull();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("usuario");
  };
  