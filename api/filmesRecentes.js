const knex = require("../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    const filme = await knex("filme").select("*").orderBy('id', 'desc')
    return res.json(filme);
  };

  return { get };
};  