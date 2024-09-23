import {db} from '../models/db.js'

export const añadirDetalle = async (req, res) => {
    try{
        const {idCompra, idProducto, cantidad} = req.body
        if(!idCompra, !idProducto, !cantidad) return res.status(400).json({message: "Uno o más campos vacios"})
        const compraExists = db.select('*').where('idCompra', idCompra).from('compras').first()
        if(!compraExists) return res.status(404).json({message: "No se ha encontrado la compra seleccionada"})
        const productoExists = db.select('*').where('idProducto', idProducto).from('productos').first()
        if(!productoExists) return res.status(404).json({message: "No se ha encontrado el producto seleccionado"})
        const precioUnitario = productoExists.precioCompra
        const total = compraExists.total + precioUnitario * cantidad
        const compraUpdated = db('compra').update({total}).where('idCompra', idCompra)
        if(!compraUpdated) return res.status(500).json({message: "Hubo un error a la hora de actualizar el total"})
        const newDetalle = db('deleteCompra').insert({idCompra, idCompra, cantidad, precioUnitario})
        if(!newDetalle) return res.status(500).json({message: "Hubo un error a la hora de añadir el producto"})
        return res.status(200).json({message: "Producto añadido correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}