const express = require('express');
const ProdutoController = require('../controller/produto.controller')
const produtoController = new ProdutoController()

const router = express.Router();

router.post('/produtos', (req, res) => produtoController.criarProduto(req, res));
router.get('/produtos', (req, res) => produtoController.listarProduto(req, res));
router.get('/produtos/:id', (req, res) => produtoController.listarProdutoPorId(req, res));
router.delete('/produtos/:id', (req, res) => produtoController.deletarProduto(req, res));

module.exports = router;