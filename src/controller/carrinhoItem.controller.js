const CarrinhoItemService = require('../service/carrinhoItem.service')
const carrinhoItemService = new CarrinhoItemService()

class CarrinhoItemController {

    // 🛒 POST - adicionar produto
    async adicionarProduto(req, res) {
        try {
            const usuario_id = req.usuario.id
            const { produto_id, quantidade } = req.body

            const resultado = await carrinhoItemService.adicionarProduto(
                usuario_id,
                produto_id,
                quantidade
            )

            return res.status(201).json(resultado)

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    // 📋 GET - listar carrinho
    async listarCarrinho(req, res) {
        try {
            const usuario_id = req.usuario.id

            const carrinho = await carrinhoItemService.listarCarrinho(usuario_id)

            return res.status(200).json(carrinho)

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    // 🔄 PUT - atualizar quantidade
    async atualizarQuantidade(req, res) {
        try {
            const usuario_id = req.usuario.id
            const { produto_id, novaQuantidade } = req.body

            const resultado = await carrinhoItemService.atualizarQuantidade(
                usuario_id,
                produto_id,
                novaQuantidade
            )

            return res.status(200).json(resultado)

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    // ❌ DELETE - remover produto
    async removerProduto(req, res) {
        try {
            const usuario_id = req.usuario.id
            const { produto_id } = req.params

            const resultado = await carrinhoItemService.removerProduto(
                usuario_id,
                produto_id
            )

            return res.status(200).json(resultado)

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    // 🧹 DELETE - limpar carrinho
    async limparCarrinho(req, res) {
        try {
            const usuario_id = req.usuario.id

            const resultado = await carrinhoItemService.limparCarrinho(usuario_id)

            return res.status(200).json(resultado)

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

}

module.exports = CarrinhoItemController