const knex = require("../config/db");

module.exports = (app) => {
  const { existsOrError } = app.api.validator;

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "filmeUsuario does not exist!");

      const getIdfilmeUsuario = await knex("filmeUsuario")
        .where({ fk_usuario_id: req.params.id })
        .first();
      existsOrError(getIdfilmeUsuario, "filmeUsuario not found");

      res.status(200).json(getIdfilmeUsuario);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "filmeUsuario does not exist!");

      const removefilmeUsuario = await knex("filmeUsuario")
        .del()
        .where({ id: req.params.id });
      existsOrError(removefilmeUsuario, "filmeUsuario not found");

      res.status(204).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    const filmeUsuario = req.body;
    try {
      const newfilmeUsuario = await knex("filmeUsuario").insert(filmeUsuario);
      res.json(newfilmeUsuario);
    } catch (err) {
      console.log(res);
      return res.status(500).send(err);
    }
  };

  const put = async (req, res) => {
    const filmeUsuario = req.body;
    const fk_usuario_id = req.body.fk_usuario_id;
    const fk_filme_id = req.body.fk_filme_id;
    try {

      const attfilmeUsuario = await knex("filmeUsuario")
        .update(filmeUsuario)
        .where({ fk_filme_id: fk_filme_id, fk_usuario_id: fk_usuario_id });
      existsOrError(attfilmeUsuario, "filmeUsuario not found");

      res.status(200).send();
    } catch (msg) {
      console.log(msg)
      return res.status(400).send(msg);
    }
  };

  return { getById, post, put, remove };
};
