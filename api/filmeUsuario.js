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
    const id = req.params.id;
    try {
      existsOrError(id, "filmeUsuario does not exist!");

      const attfilmeUsuario = await knex("filmeUsuario")
        .update(filmeUsuario)
        .where({ id: id });
      existsOrError(attfilmeUsuario, "filmeUsuario not found");

      res.status(200).send();
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  return { getById, post, put, remove };
};
