const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

class AuthService {

    async login(email, senha) {

        const usuario = await Usuario
            .scope('comSenha')
            .findOne({ where: { email } });

        if (!usuario) {
            throw new Error('Email ou senha inválidos');
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            throw new Error('Email ou senha inválidos');
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                perfil: usuario.perfil
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil
            },
            token
        };
    }
}

module.exports = AuthService;