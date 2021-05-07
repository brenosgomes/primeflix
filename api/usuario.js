const knex = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple")
const authSecret = process.env.authSecret;

module.exports = (app) => {
  const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator;

  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  const get = async (req, res) => {
    const usuario = await knex("usuario").select("*");
    return res.json(usuario);
  };

  const getById = async (req, res) => {
    try {
      existsOrError(req.params.id, "usuario não existe!");

      const getIdUsuario = await knex("usuario")
        .where({ id: req.params.id })
        .first();
      existsOrError(getIdUsuario, "usuario não encontrado");

      res.json(getIdUsuario);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  };

  const remove = async (req, res) => {
    try {
      existsOrError(req.params.id, "usuario não existe!");

      const removeusuario = await knex("usuario")
        .del()
        .where({ id: req.params.id });

      existsOrError(removeusuario, "usuario não encontrado");

      res.status(204).send();
    } catch (msg) {
      console.log(msg)
      return res.status(400).send(msg);
    }
  };

  const post = async (req, res) => {
    let {
      email,
      nome,
      senha,
      confirma_senha
    } = req.body;

    try {
      existsOrError(email, "usuario não informado");
      existsOrError(senha, "Senha não informada");
      existsOrError(confirma_senha, "Confirmação de senha invalida");
      equalsOrError(
        senha,
        confirma_senha,
        "Senhas não conferem"
      );

      const usuarioFromDB = await knex("usuario")
        .where({ email: email })
        .first();

      if (email) {
        notExistsOrError(usuarioFromDB, "usuario já cadastrado");
        res.status(400);
      }

      senha = encryptPassword(senha);
      delete confirma_senha;

      const finalusuario = await knex("usuario").insert({
        email,
        nome,
        senha
      });

      res.status(200).send("Usuario criado")
      
    } catch (msg) {
      console.log(msg);
      return res.status(400).send(msg);
    }
  };

  return { get, getById, post, remove };
};
