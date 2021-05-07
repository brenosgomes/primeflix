exports.up = function (knex) {
    return knex.schema.createTable("cargo", (table) => {
      table.increments("id").primary();
      table.string("cargo").notNull();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("cargo");
  };
  