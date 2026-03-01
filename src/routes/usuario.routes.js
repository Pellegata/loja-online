const express = require('express');
const UsuarioController = require('../controller/usuario.controller');
const authMiddleware = require('../middleware/auth.middleware')
const soAdminMiddleware = require('../middleware/soAdm.middleware')

const router = express.Router();
const usuarioController = new UsuarioController();

router.post('/usuarios', (req, res) => usuarioController.cadastrar(req, res));
router.get('/usuarios', (req, res) => usuarioController.listar(req, res));
router.get('/usuarios/:id', (req, res) => usuarioController.buscarPorId(req, res));
router.delete('/usuarios/:id', authMiddleware, soAdminMiddleware, (req, res) => usuarioController.deletar(req, res));

module.exports = router;