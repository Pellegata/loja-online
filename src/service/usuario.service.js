const { hash } = require('bcrypt');
const { Usuario } = require('../models');


class UsuarioService {

    async cadastrar(dto) {

        const usuarioExistente = await Usuario.findOne({
            where: { email: dto.email }
        });

        if (usuarioExistente) {
            throw new Error('Usuário já cadastrado');
        }

        const senhaHash = await hash(dto.senha, 8);

        const novoUsuario = await Usuario.create({
            nome: dto.nome,
            email: dto.email,
            senha: senhaHash,
            perfil: dto.perfil || 'cliente'
        });

        return novoUsuario;
    }

    async buscarUsuarios() {
        return await Usuario.findAll();
    }

    async buscarUsuarioPorId(id) {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            throw new Error('Usuário não existe');
        }

        return usuario;
    }

    async deletarUsuario(id) {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            throw new Error('Usuário não existe');
        }

        await usuario.destroy();
    }
}

module.exports = UsuarioService;