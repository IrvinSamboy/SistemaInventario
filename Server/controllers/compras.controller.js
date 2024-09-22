import {db} from '../models/db.js'
import getToken from '../utils/getToken.js'

export const createCompra = async (req, res) => {
    try{
        const {idProveedor} = req.body
        if(!idProveedor) return res.status(400).json({message: "Tienes que introducir un proveedor"})
        const proveedor = await db.select('*').where('idProveedor', idProveedor).from('proveedores').first()
        if(!proveedor) return res.status(500).json({message: "Proveedor no encontrado"})
        const fecha = new Date()
        const {idUser} = getToken(req.cookies.token)
        const newCompra = db('compras').insert({idProveedor, fecha, idUser})
        if(!newCompra) return res.status(500).json({message: "Ha ocurrido un error al crearla compra"})
        return res.status(200).json({message: "Compra creada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const updateCompra = async (req, res) => {
    try{
        const {id} = req.params
        const compra = await db.select('*').where('idCompra', id).from('compras').first()
        if(!compra) return res.status(500).json({message: "Compra no encontrada"})
        const {
                idProveedor = compra.idProveedor
            } = req.body
        const proveedor = await db.select('*').where('idProveedor', idProveedor).from('proveedores').first()
        if(!proveedor) return res.status(500).json({message: "Proveedor no encontrado"})
        const proveedorUpdated = db('compras').update({idProveedor}).where('idCompra', id)
        if(!proveedorUpdated) return res.status(500).json({message: "Ha ocurrido un error al crearla compra"})
        return res.status(200).json({message: "Compra editada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const deleteCompra = async (req, res) => {
    try{
        const {id} = req.params
        const compra = await db.select('*').where('idCompra', id).from('compras').first()
        if(!compra) return res.status(500).json({message: "Compra no encontrada"})
        await db('compras').where('idCompra', id).del()
        return res.status(200).json({message: "Compra eliminada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}