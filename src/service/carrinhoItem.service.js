const { CarrinhoItem, Carrinho, Produto } = require('../models')

class CarrinhoItemService {

    // 🔎 Buscar ou criar carrinho do usuário
    async buscarOuCriarCarrinho(usuario_id) {
        let carrinho = await Carrinho.findOne({ where: { usuario_id } })

        if (!carrinho) {
            carrinho = await Carrinho.create({ usuario_id })
        }

        return carrinho
    }

    // 🛒 Adicionar produto ao carrinho
    async adicionarProduto(usuario_id, produto_id, quantidade) {

        if (quantidade <= 0) {
            throw new Error('Quantidade inválida')
        }

        const carrinho = await this.buscarOuCriarCarrinho(usuario_id)

        const produto = await Produto.findByPk(produto_id)

        if (!produto) {
            throw new Error('Produto não encontrado')
        }

        const itemExistente = await CarrinhoItem.findOne({
            where: {
                carrinho_id: carrinho.id,
                produto_id
            }
        })

        if (itemExistente) {
            itemExistente.quantidade += quantidade
            await itemExistente.save()
            return itemExistente
        }

        const novoItem = await CarrinhoItem.create({
            carrinho_id: carrinho.id,
            produto_id,
            quantidade,
            preco_unitario: produto.preco
        })

        return novoItem
    }

    // 📋 Listar carrinho do usuário
    async listarCarrinho(usuario_id) {

        const carrinho = await Carrinho.findOne({
            where: { usuario_id }
        })

        if (!carrinho) {
            return { itens: [], total: 0 }
        }

        const itens = await CarrinhoItem.findAll({
            where: { carrinho_id: carrinho.id },
            include: {
                model: Produto,
                attributes: ['id', 'nome', 'preco']
            }
        })

        let total = 0

        const itensFormatados = itens.map(item => {
            const subtotal = item.quantidade * item.preco_unitario
            total += subtotal

            return {
                item_id: item.id,
                produto_id: item.produto_id,
                nome: item.Produto.nome,
                quantidade: item.quantidade,
                preco_unitario: item.preco_unitario,
                subtotal
            }
        })

        return {
            carrinho_id: carrinho.id,
            itens: itensFormatados,
            total
        }
    }

    // 🔄 Atualizar quantidade
    async atualizarQuantidade(usuario_id, produto_id, novaQuantidade) {

        if (novaQuantidade <= 0) {
            throw new Error('Quantidade inválida')
        }

        const carrinho = await Carrinho.findOne({ where: { usuario_id } })

        if (!carrinho) {
            throw new Error('Carrinho não encontrado')
        }

        const item = await CarrinhoItem.findOne({
            where: {
                carrinho_id: carrinho.id,
                produto_id
            }
        })

        if (!item) {
            throw new Error('Produto não está no carrinho')
        }

        // 🔥 Buscar preço atual do produto
        const produto = await Produto.findByPk(produto_id)

        if (!produto) {
            throw new Error('Produto não encontrado')
        }

        // 🔄 Atualiza quantidade
        item.quantidade = novaQuantidade

        // 💰 Atualiza preço_unitario com preço atual
        item.preco_unitario = produto.preco

        await item.save()

        return item
    }

    // ❌ Remover produto do carrinho
    async removerProduto(usuario_id, produto_id) {

        const carrinho = await Carrinho.findOne({ where: { usuario_id } })

        if (!carrinho) {
            throw new Error('Carrinho não encontrado')
        }

        const item = await CarrinhoItem.findOne({
            where: {
                carrinho_id: carrinho.id,
                produto_id
            }
        })

        if (!item) {
            throw new Error('Produto não está no carrinho')
        }

        await item.destroy()

        return { message: 'Produto removido do carrinho' }
    }

    // 🧹 Limpar carrinho inteiro
    async limparCarrinho(usuario_id) {

        const carrinho = await Carrinho.findOne({ where: { usuario_id } })

        if (!carrinho) {
            throw new Error('Carrinho não encontrado')
        }

        await CarrinhoItem.destroy({
            where: { carrinho_id: carrinho.id }
        })

        return { message: 'Carrinho esvaziado com sucesso' }
    }

}

module.exports = CarrinhoItemService