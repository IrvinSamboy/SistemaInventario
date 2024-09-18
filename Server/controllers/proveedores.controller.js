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
        if(!proveedor) return res.status(404).json({message: "Proveedor no encontrado"})
        return res.status(200).json({message: proveedor})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const createProveedor = async (req, res) => {
    try{
        const {nombre, direccion, telefono, email} = req.body
        if(!nombre, !direccion, !telefono, !email) return res.status(400).json({message: "Uno o más campos vacios"})
        const newProveedor = await db('proveedores').insert({nombre, direccion, telefono, email})
        if(!newProveedor) return res.status(500).json({message: "Error al crear el proveedor"})
        return res.status(200).json({message: "Proveedor creado correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const updateProveedor = async (req, res) => {
    try{
        const {id} = req.params
        const proveedorExists = await db.select('*').where('idProveedor', id).from('proveedores').first()
        if(!proveedorExists) return res.status(404).json({message: "Proveedor no encontrado"})
        
        const {
            nombre = proveedorExists.nombre,
            direccion = proveedorExists.direccion,
            telefono = proveedorExists.telefono,
            email = proveedorExists.email
        } = req.body

        const proveedorEdited = await db('proveedores').update({
            nombre,
            direccion,
            telefono,
            email
        }).where('idProveedor', id)

        if(!proveedorEdited) return res.status(500).json({message: "Error al editar el proveedor"})
        return res.status(200).json({message: "Proveedor editado correctamente"})

    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const deleteProveedor = async (req, res) => {
    try{
        const {id} = req.params
        const proveedorExists = await db.select('*').where('idProveedor', id).from('proveedores')
        if(!proveedorExists) return res.status(404).json({message: "Proveedor no encontrado"})
        await db('proveedores').where('idProveedor', id).del()
        return res.status(200).json({message: "Proveedor eliminado correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
} 