const CategoriaService = require('../service/categoria.service')
const categoriaService = new CategoriaService()

class CategoriaController {
    async cadastrar(req, res) {
        try {
            const novaCategoira = await categoriaService.cadastrar(req.body);
            return res.status(201).json(novaCategoira);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async listar(req, res) {
        try {
            const categoiras = await categoriaService.listar();
            return res.status(200).json(categoiras);
        } catch (error) {
            return res.status(400).json({ erro: error.message });
        }
    }

    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const categoria = await categoriaService.buscarPorId(id);
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }

    async deletar(req, res) {
        try {
            const { id } = req.params;
            await categoriaService.deletar(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(404).json({ erro: error.message });
        }
    }
}

module.exports = CategoriaController