
const knex = require("../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const get = async (req, res) => {
    try {
      existsOrError(req.query, "filme does not exist!");

      const getIdfilme = await knex("filme")
        .select('filme.nome', 'genero.genero', 'filme.nota')
        .innerJoin('filmeGenero', 'filme.id', 'filmeGenero.fk_filme_id')
        .innerJoin('genero', 'filmeGenero.fk_genero_id', 'genero.id')
        .where({ genero: req.query.genero })
        .orderBy('nota', 'desc')

      existsOrError(getIdfilme, "filme not found");

      res.status(200).json(getIdfilme);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { get };
};