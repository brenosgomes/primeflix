exports.up = function (knex) {
    return knex.schema.createTable("filme", (table) => {
      table.increments("id").primary();
      table.string("nome").notNull();
      table.integer("duracao").notNull();
      table.integer("ano").nullable();
      table.float("nota").nullable();
      table.string("imagem").nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("filme");
  };
  