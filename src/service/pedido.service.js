const {
    CarrinhoItem,
    Carrinho,
    Pedido,
    PedidoItem,
    Produto,
    sequelize
} = require('../models')

class PedidoService {

    async finalizarCompra(usuario_id) {

        return await sequelize.transaction(async (transaction) => {

            // 1️⃣ Buscar carrinho
            const carrinho = await Carrinho.findOne({
                where: { usuario_id },
                transaction
            })

            if (!carrinho) {
                throw new Error('Carrinho não existe')
            }

            // 2️⃣ Buscar itens do carrinho
            const carrinhoItems = await CarrinhoItem.findAll({
                where: { carrinho_id: carrinho.id },
                transaction
            })

            if (carrinhoItems.length === 0) {
                throw new Error('Carrinho está vazio')
            }

            // 3️⃣ Criar pedido
            const pedido = await Pedido.create({
                usuario_id,
                status: 'PENDENTE',
                valor_total: 0
            }, { transaction })

            let total = 0

            // 4️⃣ Criar PedidoItems
            for (const item of carrinhoItems) {

                const produto = await Produto.findByPk(item.produto_id, {
                    transaction,
                    lock: transaction.LOCK.UPDATE
                })

                if (!produto) {
                    throw new Error(`Produto ${item.produto_id} não encontrado`)
                }

                const precoUnitario = produto.preco
                const subtotal = precoUnitario * item.quantidade

                if (produto.estoque < item.quantidade) {
                    throw new Error('Estoque insuficiente')
                }
                produto.estoque -= item.quantidade
                await produto.save({ transaction })

                await PedidoItem.create({
                    pedido_id: pedido.id,
                    produto_id: produto.id,
                    quantidade: item.quantidade,
                    preco_unitario: precoUnitario,
                    subtotal
                }, { transaction })

                total += subtotal

            }

            // 5️⃣ Atualizar total
            pedido.valor_total = total
            await pedido.save({ transaction })

            // 6️⃣ Limpar carrinho
            await CarrinhoItem.destroy({
                where: { carrinho_id: carrinho.id },
                transaction
            })

            // 7️⃣ Retornar pedido
            return await Pedido.findByPk(pedido.id, {
                include: [
                    {
                        model: PedidoItem,
                        include: [Produto]
                    }
                ],
                transaction
            })
        })
    }
}

module.exports = PedidoService