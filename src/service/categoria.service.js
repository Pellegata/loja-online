const { Categoria } = require('../models')

class CategoriaService {
    async cadastrar(dto) {
        const categoria = await Categoria.findOne({
            where: {
                nome: dto.nome
            }
        })

        if(categoria) {
            throw new Error('Categoria já existe')
        }
        const novaCategorira = await Categoria.create({
            nome: dto.nome
        })
        return novaCategorira
    }

    async listar() {
        return await Categoria.findAll()
    }

    async listarPorId(id) {
        const categoria = await Categoria.findByPk(id)
        if(!categoria) {
            throw new Error('Categoria não existe')
        }
        return categoria
    }

    async deletar(id) {
        const categoria = await Categoria.findByPk(id)
        if(!categoria) {
            throw new Error('Categoria não existe')
        }
        return categoria
    }
}

module.exports = CategoriaService