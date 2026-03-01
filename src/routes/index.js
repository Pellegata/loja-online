const express = require('express')
const usuario = require('./usuario.routes')
const auth = require('./auth.routes')
const categoria = require('./categoria.routes')
const produto = require('./produto.routes')
const carrinho = require('./carrinhoItem.routes')
const pedido = require('./pedido.routes')

module.exports = (app) => {
    app.use(
        express.json(),
        auth,
        usuario,
        categoria,
        produto,
        carrinho,
        pedido
    )
}

