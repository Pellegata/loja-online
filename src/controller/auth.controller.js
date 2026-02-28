const AuthService = require('../service/auth.service');

const authService = new AuthService();

class AuthController {

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const resultado = await authService.login(email, senha);

            return res.status(200).json(resultado);

        } catch (error) {
            return res.status(401).json({ erro: error.message });
        }
    }
}

module.exports = AuthController;