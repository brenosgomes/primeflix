const knex = require("../config/db");

module.exports = (app) => {
    const { existsOrError } = app.api.validator;

    const get = async (req, res) => {
        const filme = await knex("filme").where('nome', 'like', `%${req.body.filme_nome}%`)
        return res.json(filme);
    };

    return { get };
};  