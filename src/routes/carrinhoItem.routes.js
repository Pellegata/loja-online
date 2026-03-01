const express = require('express')
const router = express.Router()
const CarrinhoItemController = require('../controller/carrinhoItem.controller')
const carrinhoItemController = new CarrinhoItemController()
const authMiddleware = require('../middleware/auth.middleware')

// ➕ Adicionar produto
router.post('/carrinho', authMiddleware, carrinhoItemController.adicionarProduto)

// 📋 Listar carrinho
router.get('/carrinho', authMiddleware, carrinhoItemController.listarCarrinho)

// 🔄 Atualizar quantidade
router.put('/carrinho', authMiddleware, carrinhoItemController.atualizarQuantidade)

// ❌ Remover produto específico
router.delete('/carrinho/:produto_id', authMiddleware, carrinhoItemController.removerProduto)

// 🧹 Limpar carrinho inteiro
router.delete('/carrinho', authMiddleware, carrinhoItemController.limparCarrinho)

module.exports = router