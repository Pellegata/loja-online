module.exports = function apenasAdmin(req, res, next) {
    if (req.usuario.perfil !== 'admin') {
        return res.status(403).json({ erro: 'Acesso negado' });
    }
    next();
};