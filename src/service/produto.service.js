const { Produto, Categoria } = require('../models')

class ProdutoService {

    async criarProduto(dto) {
        // 🔎 Verifica se categoria existe
        const categoria = await Categoria.findByPk(dto.categoria_id)
        if (!categoria) {
            throw new Error('Categoria não encontrada')
        }

        // 🔎 Validações básicas
        if (dto.preco < 0) {
            throw new Error('Preço inválido')
        }

        if (dto.estoque < 0) {
            throw new Error('Estoque inválido')
        }

        const produto = await Produto.create({
            nome: dto.nome,
            descricao: dto.descricao,
            preco: dto.preco,
            estoque: dto.estoque,
            categoria_id: dto.categoria_id
        })

        return produto
    }

    async listarProdutos() {
        return await Produto.findAll({
            include: {
                model: Categoria,
                attributes: ['id', 'nome']
            }
        })
    }

    async buscarProdutoPorId(id) {
        const produto = await Produto.findByPk(id, {
            include: {
                model: Categoria,
                attributes: ['id', 'nome']
            }
        })

        if (!produto) {
            throw new Error('Produto não encontrado')
        }

        return produto
    }

    async atualizarProduto(dto) {

        const produto = await Produto.findByPk(dto.id)

        if (!produto) {
            throw new Error('Produto não encontrado')
        }

        if (dto.categoriaId !== undefined) {
            const categoria = await Categoria.findByPk(dto.categoriaId)
            if (!categoria) {
                throw new Error('Categoria não encontrada')
            }
        }

        if (dto.preco !== undefined && dto.preco < 0) {
            throw new Error('Preço inválido')
        }

        if (dto.estoque !== undefined && dto.estoque < 0) {
            throw new Error('Estoque inválido')
        }

        const { id, ...dadosAtualizados } = dto

        await produto.update(dadosAtualizados)

        return produto
    }

    async deletarProduto(id) {
        const produto = await Produto.findByPk(id)

        if (!produto) {
            throw new Error('Produto não encontrado')
        }

        await produto.destroy()

        return { message: 'Produto deletado com sucesso' }
    }
}

module.exports = ProdutoService