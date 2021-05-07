exports.up = function (knex) {
    return knex.schema.createTable("genero", (table) => {
      table.increments("id").primary();
      table.string("genero").notNull();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("genero");
  };
  