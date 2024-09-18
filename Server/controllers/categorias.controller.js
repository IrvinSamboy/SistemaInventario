import {db} from '../models/db.js'

export const getCategorias = async (req, res) => {
    try{
        const categorias = await db.select('*').from('categorias')
        if(categorias.length === 0) return res.status(404).json({message: "No hay categorías en el sistema"})
        res.status(200).json({message: categorias})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console(error)
    }
}

export const getCategoriaById = async (req, res) => {
    try{
        const {id} = req.params
        const categoria = await db.select('*').where('idCategoria', id).from('categorias').first()
        if(!categoria) return res.status(404).json({message: "Categoróa no encontrada"})
        res.status(200).json({message: categoria})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console(error)
    }
}

export const createCategoria = async (req, res) => {
    try{
        const {nombre} = req.body
        if(!nombre) return res.status(400).json({message: "Necesitas escribir el nombre de la categoria"})
        const newCategoria = await db('categorias').insert({nombre})
        if(!newCategoria) return res.status(500).json({message: "Error al crear la categoría"})
        return res.status(200).json({message: "Categoría creado correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console(error)
    }
}

export const updateCategoria = async (req, res) => {
    try{
        const {id} = req.params
        const categoria = await db.select('*').where('idCategoria', id).from('categorias').first()
        if(!categoria) return res.status(404).json({message: "Categoróa no encontrada"})
        const {
                nombre = categoria.nombre
        } = req.body
        const categoriaEdited = await db('categorias').update({nombre}).where('idCategoria', id)
        if(!categoriaEdited) res.status(500).json({message: "Hubo un error al editar la categoria"})
        res.status(200).json({message: "Categoria actualizada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console(error)
    }
}

export const deleteCategoria = async (req, res)=> {
    try{
        const {id} = req.params
        const categoria = await db.select('*').where('idCategoria', id).from('categorias').first()
        if(!categoria) return res.status(404).json({message: "Categoróa no encontrada"})
        await db('categorias').where('idCategoria', id).del()
        return res.status(200).json({message: "Categoria eliminada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console(error)
    }
}
