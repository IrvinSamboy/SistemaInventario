import {db} from '../models/db.js'

export const addDetalle = async (req, res) => {
    try{
        const {idCompra, idProducto, cantidad} = req.body
        if(!idCompra, !idProducto, !cantidad) return res.status(400).json({message: "Uno o más campos vacios"})
        const compraExists = db.select('*').where('idCompra', idCompra).from('compras').first()
        if(!compraExists) return res.status(404).json({message: "No se ha encontrado la compra seleccionada"})
        const productoExists = db.select('*').where('idProducto', idProducto).from('productos').first()
        if(!productoExists) return res.status(404).json({message: "No se ha encontrado el producto seleccionado"})
        const precioUnitario = productoExists.precioCompra
        const total = compraExists.total + (precioUnitario * cantidad)
        const compraUpdated = db('compra').update({total}).where('idCompra', idCompra)
        if(!compraUpdated) return res.status(500).json({message: "Hubo un error a la hora de actualizar el total"})
        const newDetalle = db('detallesCompra').insert({idCompra, idCompra, cantidad, precioUnitario})
        if(!newDetalle) return res.status(500).json({message: "Hubo un error a la hora de añadir el producto"})
        return res.status(200).json({message: "Producto añadido correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const editDetalle = async (req, res) => {
    try{
        const {id} = req.params 
        const detalleExists = await db.select('*').where('idDetalle', id).from('detallesCompra')
        if(!detalleExists) return res.status(404).json({message: "Detalle no encontrado"})
        const compraTotal = db.select('total').where('idCompra', detalleExists.idCompra).from('compras').first()
        const {
                idProducto = detalleExists.idProducto, 
                cantidad = detalleExists.cantidad
        } = req.body

        let precioUnitario = detalleExists.precioUnitario
        if(idProducto !== detalleExists.idProducto) {
            const productoExists = db.select('*').where('idProducto', idProducto).from('productos').first()
            if(!productoExists) return res.status(404).json({message: "No se ha encontrado el producto seleccionado"})
            precioUnitario = productoExists.precioCompra
        }
                
        if(cantidad !== detalleExists.cantidad || idProducto !== detalleExists.idProducto){
            const total = compraTotal.total + (precioUnitario * cantidad)
            const compraUpdated = db('compra').update({total}).where('idCompra', detalleExists.idCompra)
            if(!compraUpdated) return res.status(500).json({message: "Hubo un error a la hora de actualizar el total"})
        }
        
        const detalleUpdated = await db('detallesCompra').update({
            idProducto,
            cantidad
        }).where('idDetalle', id) 
        
        if(!detalleUpdated) return res.status(500).json({message: "Hubo un error a la hora de actualizar el detalle"})
        return res.status(200).json({message: "Detalle actualizado correctamente"})

    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const deleteDetalle = async (req, res) => {
    try{
        const {id} = req.params 
        const detalleExists = await db.select('*').where('idDetalle', id).from('detallesCompra')
        if(!detalleExists) return res.status(404).json({message: "Detalle no encontrado"})
        await db('detalleCompra').where('idDetalle', id).del()
        return res.status(200).json({message: "Detalle eliminado correctamente"})

    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
