const express = require('express');
const CategoriaController = require('../controller/categoria.controller');
const authMiddleware = require('../middleware/auth.middleware')
const soAdminMiddleware = require('../middleware/soAdm.middleware')

const router = express.Router();
const categoriaController = new CategoriaController();

router.post('/categorias', authMiddleware, soAdminMiddleware, (req, res) => categoriaController.cadastrar(req, res));
router.get('/categorias', (req, res) => categoriaController.listar(req, res));
router.get('/categorias/:id', (req, res) => categoriaController.buscarPorId(req, res));
router.delete('/categorias/:id', authMiddleware, soAdminMiddleware, (req, res) => categoriaController.deletar(req, res));

module.exports = router;