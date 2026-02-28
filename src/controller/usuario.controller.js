const UsuarioService = require('../service/usuario.service');
const usuarioService = new UsuarioService();

class UsuarioController {

    async cadastrar(req, res) {
        try {
            const novoUsuario = await usuarioService.cadastrar(req.body);
            return res.status(201).json(novoUsuario);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async listar(req, res) {
        try {
            const usuarios = await usuarioService.buscarUsuarios();
            return res.status(200).json(usuarios);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuarioService.buscarUsuarioPorId(id);
            return res.status(200).json(usuario);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            await usuarioService.deletarUsuario(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }
}

module.exports = UsuarioController;