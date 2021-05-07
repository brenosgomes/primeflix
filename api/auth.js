require("dotenv").config()
const authSecret = process.env.authSecret;
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const knex = require("../config/db");

module.exports = (app) => {
  const signIn = async (req, res) => {
    if (!req.body.email || !req.body.senha) {
      return res.status(400).send("Insira usuario e senha");
    }

    const usuario = await knex("usuario")
      .where({ email: req.body.email })
      .first();

    if (!usuario) return res.status(400).send("usuario não encontrado");

    const isMatch = bcrypt.compareSync(
      req.body.senha,
      usuario.senha
    );

    if (!isMatch)
      return res.status(401).send("Combinação de usuario e senha inválida!");

    const now = Date.now();

    payload = {
      ...usuario,
      iat: now,
      exp: now + 1000 * 60 * 60 * 24,
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret),
    });
  };

  const validateToken = (req, res) => {
    const { usuarioData } = req.body || null;

    try {
      if (usuarioData) {
        const token = jwt.decode(usuarioData.token, authSecret);
        if (new Date(token.exp * 1000) > new Date()) {
          return res.status(200).json({
            success: true,
            name: token.nome,
            email: token.email
          });
        }
      }
    } catch (e) {
      res.status(401);
    }
    res.send(false);
  };

  return { signIn, validateToken };
};
