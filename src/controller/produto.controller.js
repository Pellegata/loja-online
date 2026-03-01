const ProdutoService = require('../service/produto.service')
const produtoService = new ProdutoService()

class ProdutoController {

    async criarProduto(req, res) {
        try {
            const { nome, descricao, preco, estoque, categoria_id } = req.body
            const produto = await produtoService.criarProduto({ nome, descricao, preco, estoque, categoria_id })
            return res.status(201).json(produto)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async listarProduto(req, res) {
        try {
            const produtos = await produtoService.listarProdutos()
            return res.status(200).json(produtos)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async listarProdutoPorId(req, res) {
        try {
            const { id } = req.params
            const produto = await produtoService.buscarProdutoPorId(id)
            return res.status(200).json(produto)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async atualizarProduto(req, res) {
        try {
            const { id } = req.params

            const produto = await produtoService.atualizarProduto({
                id,
                ...req.body
            })

            return res.status(200).json(produto)

        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }

    async deletarProduto(req, res) {
        try {
            const { id } = req.params
            const resultado = await produtoService.deletarProduto(id)
            return res.status(200).json(resultado)
        } catch (error) {
            return res.status(400).json({ error: error.message })
        }
    }
}

module.exports = ProdutoController