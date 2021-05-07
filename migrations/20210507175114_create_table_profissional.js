exports.up = function (knex) {
    return knex.schema.createTable("profissional", (table) => {
      table.increments("id").primary();
      table.string("nome").notNull();   
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("profissional");
  };
  