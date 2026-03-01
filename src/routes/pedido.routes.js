const { Router } = require('express')
const PedidoController = require('../controller/pedido.controller')
const pedidoController = new PedidoController()
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post('/pedidos/finalizar', authMiddleware, (req, res) => pedidoController.finalizar(req, res))

module.exports = router