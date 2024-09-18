import {db} from '../models/db.js'

export const getProducto = async (req, res) => {
    try{
        const productos = await db.select('*').from('productos')
        if(productos.length === 0) return res.status(404).json({message: "No hay productos en el sistema"})
        res.status(200).json({message: productos})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getProductoById = async (req, res) => {
    try{
        const {id} = req.params
        const producto = await db.select('*').where('idProducto', id).from('productos').first()
        if(!producto) return res.status(404).json({message: "Producto no encontrado"})
        res.status(200).json({message: producto})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getProductosByCategoria = async (req, res) => {
    try{
        const {id} = req.params
        const categoriaExists = await db.select('idCategoria', 'nombre').where('idCategoria', id).from('categorias').first()
        if(!categoriaExists) return res.status(404).json({message: "Categoróa no encontrada"})
        const productos = await db.select('*').where('idCategoria', id).from('productos')
        if(productos.length === 0) return res.status(404).json({message: "Esta categoria no posee productos"})
        res.status(200).json({message: productos})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const createProducto = async (req, res) => {
    try{
        const {nombre, descripcion, stock, foto, precioCompra, precioVenta, idCategoria} = req.body
        if(!nombre, !descripcion, !stock, !precioCompra, !precioVenta, !idCategoria) return res.status(403).json({message: "Uno o más campos vacios"})
        const categoriaExists = await db.select('idCategoria', 'nombre').where('idCategoria', idCategoria).from('categorias').first()
        if(!categoriaExists) return res.status(404).json({message: "Categoróa no encontrada"})
        const newProducto = await db('productos').insert({nombre, descripcion, stock, foto, precioCompra, precioVenta, idCategoria})
        if(!newProducto) return res.status(500).json({message: "Error al crear el producto"})
        return res.status(200).json({message: "Producto creado correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const updateProducto = async (req, res) => {
    try{
        const {id} = req.params
        const productoExists = await db.select('*').where('idProducto', id).from('productos').first()
        if(!productoExists) return res.status(404).json({message: "Producto no encontrado"})
        
        const {
            nombre = productoExists.nombre, 
            descripcion = productoExists.descripcion, 
            stock = productoExists.stock, 
            foto = productoExists.foto, 
            precioCompra = productoExists.precioCompra, 
            precioVenta = productoExists.precioVenta, 
            idCategoria = productoExists.idCategoria
        } = req.body
        const productoEdited = await db('productos').update({
            nombre, 
            descripcion, 
            stock, 
            foto, 
            precioCompra, 
            precioVenta, 
            idCategoria}).where('idProducto', id)
        
        if(!productoEdited) return res.status(500).json({message: "Hubo un error al editar el producto"})
        return res.status(200).json({message: "Producto editado correctamente"})

    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const deleteProducto = async (req, res) => {
    try{
        const {id} = req.params
        const productoExists = await db.select('*').where('idProducto', id).from('productos').first()
        if(!productoExists) return res.status(404).json({message: "Producto no encontrado"})
        await db('productos').where('idProducto', id).del()
        return res.status(200).json({message: "Producto eliminado correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const deleteProductoByCategoria = async (req, res) => {
    try{
        const {id} = req.params
        const categoriaExists = await db.select('idCategoria', 'nombre').where('idCategoria', id).from('categorias').first()
        if(!categoriaExists) return res.status(404).json({message: "Categoróa no encontrada"})
        const productos = await db.select('*').where('idCategoria', id).from('productos')
        if(productos.length === 0) return res.status(404).json({message: "Esta categoria no posee productos"})
        await db('productos').where('idCategoria', id).del()
        return res.status(200).json({message: "Productos eliminados correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}