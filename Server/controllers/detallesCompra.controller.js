import {db} from '../models/db.js'

export const getDetalles = async (req, res) => {
    try{
        const {id} = req.params
        const compra = await db.select('*').where('idCompra', id).from('compras').first()
        if(!compra) return res.status(404).json({message: "Compra no encontrada"})
        const detallesCompra = await db.select('detallesCompra.*', 'productos.nombre as nombreProducto')
        .where('detallesCompra.idCompra', id)
        .from('detallesCompra')
        .join('productos', 'productos.idProducto', 'detallesCompra.idProducto')
        if(detallesCompra.length === 0) return res.status(404).json({message: "No has añadido productos a la compra"})
        return res.status(200).json({message: detallesCompra})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getDetalleByID = async (req, res) => {
    try{
        const {id} = req.params
        const detalleCompra = await db.select('detallesCompra.*', 'productos.nombre as nombreProducto')
        .where('detallesCompra.idDetalle', id)
        .from('detallesCompra')
        .join('productos', 'productos.idProducto', 'detallesCompra.idProducto').first()
        if(!detalleCompra) return res.status(404).json({message: "No has añadido productos a la compra"})
        return res.status(200).json({message: detalleCompra})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const addDetalle = async (req, res) => {
    try{
        const {idCompra, idProducto, cantidad} = req.body
        if(!idCompra, !idProducto, !cantidad) return res.status(400).json({message: "Uno o más campos vacios"})
        const compraExists = await db.select('*').where('idCompra', idCompra).from('compras').first()
        if(!compraExists) return res.status(404).json({message: "No se ha encontrado la compra seleccionada"})
        const productoExists = await db.select('*').where('idProducto', idProducto).from('productos').first()
        if(!productoExists) return res.status(404).json({message: "No se ha encontrado el producto seleccionado"})
        const productoInDetalle = await db.select('*').where('idProducto', idProducto).from('detallesCompra').first()
        if(productoInDetalle) return res.status(404).json({message: "Ya se ha añadido el producto"})
        const precioUnitario = productoExists.precioCompra
        const total = compraExists.total + (precioUnitario * cantidad)
        const compraUpdated = await db('compras').update({total}).where('idCompra', idCompra)
        if(!compraUpdated) return res.status(500).json({message: "Hubo un error a la hora de actualizar el total"})
        const newDetalle = await db('detallesCompra').insert({idCompra, idProducto, cantidad, precioUnitario})
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
        const detalleExists = await db.select('*').where('idDetalle', id).from('detallesCompra').first()
        if(!detalleExists) return res.status(404).json({message: "Detalle no encontrado"})
        const compraTotal = await db.select('total').where('idCompra', detalleExists.idCompra).from('compras').first()
        const {
                idProducto = detalleExists.idProducto, 
                cantidad = detalleExists.cantidad
        } = req.body

        let precioUnitario = detalleExists.precioUnitario
        if(idProducto !== detalleExists.idProducto) {
            const productoExists = db.select('*').where('idProducto', idProducto).from('productos').first()
            if(!productoExists) return res.status(404).json({message: "No se ha encontrado el producto seleccionado"})
            const productoInDetalle = await db.select('*').where('idProducto', idProducto).from('detallesCompra').first()
            if(productoInDetalle) return res.status(404).json({message: "Ya se ha añadido el producto"})
            precioUnitario = productoExists.precioCompra
        }
                
        if(cantidad !== detalleExists.cantidad || idProducto !== detalleExists.idProducto){
            const resta = detalleExists.precioUnitario * detalleExists.cantidad
            const total = (compraTotal.total - resta) + (precioUnitario * cantidad)
            const compraUpdated = await db('compras').update({total}).where('idCompra', detalleExists.idCompra)
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
        const detalleExists = await db.select('*').where('idDetalle', id).from('detallesCompra').first()
        if(!detalleExists) return res.status(404).json({message: "Detalle no encontrado"})
        const compraTotal = await db.select('total').where('idCompra', detalleExists.idCompra).from('compras').first()
        const resta = detalleExists.precioUnitario * detalleExists.cantidad
        const total = compraTotal.total - resta
        const compraUpdated = await db('compras').update({total}).where('idCompra', detalleExists.idCompra)
        if(!compraUpdated) return res.status(500).json({message: "Hubo un error a la hora de actualizar el total"})
        await db('detallesCompra').where('idDetalle', id).del()
        return res.status(200).json({message: "Detalle eliminado correctamente"})

    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
