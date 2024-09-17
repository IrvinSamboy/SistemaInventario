import {db} from '../models/db.js'

export const getProveedores = async (req, res) => {
    try{
        const proveedores = await db.select('*').from('proveedores')
        if(proveedores.length === 0) return res.status(404).json({message: "No hay proveedores en el sistema"})
        return res.status(200).json({message: proveedores})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getProveedorById = async (req, res) => {
    try{
        const {id} = req.params
        const proveedor = await db.select('*').where('idProveedor', id).from('proveedores').first()
        if(proveedor) return res.status(404).json({message: "Proveedor no encontrado"})
        return res.status(200).json({message: proveedores})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}