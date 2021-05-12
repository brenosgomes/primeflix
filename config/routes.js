module.exports = app => {
    app.route('/filme_usuario')
        .post(app.api.filmeUsuario.post)
        .put(app.api.filmeUsuario.put)

    app.route('/filme_usuario/:id')
        .delete(app.api.filmeUsuario.remove)
        .get(app.api.filmeUsuario.getById)

    app.route('/usuario')
        .get(app.api.usuario.get)
        .post(app.api.usuario.post)
    
    app.route('/usuario/:id')
        .delete(app.api.usuario.remove)
        .get(app.api.usuario.getById)

    app.post('/login', app.api.auth.signIn)

    app.route('/filme')
        .get(app.api.filme.get)

    app.route('/filme_genero')
        .get(app.api.filmeGenero.get)

    app.route('/filmes_recentes')
        .get(app.api.filmesRecentes.get)

    app.route('/filmes_nome')
        .get(app.api.filmeNome.get)
}