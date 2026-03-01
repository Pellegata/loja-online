const PedidoService = require('../service/pedido.service')
const pedidoService = new PedidoService()

class PedidoController {

    async finalizar(req, res) {
        try {
            const usuario_id = req.usuario.id

            const pedido = await pedidoService.finalizarCompra(usuario_id)

            return res.status(201).json({
                message: 'Pedido finalizado com sucesso',
                pedido
            })

        } catch (error) {
            return res.status(400).json({
                error: error.message
            })
        }
    }

}

module.exports = PedidoController