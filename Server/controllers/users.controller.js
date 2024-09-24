import {db} from '../models/db.js'
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    try{
        const users = await db.select('*').from('users')
        res.status(200).json({message: users})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getUserById = async (req, res) => {
    try{
        const {id} = req.params 
        const user = await db.select('*').where('idUser', id).from('users').first()
        if(!user) return res.status(404).json({message: "Usuario no encontrado"})
        res.status(200).json({message: user})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getUserByRol = async (req, res) => {
    try{
        const {id} = req.params 
        const rolExists = await db.select('idRol').where('idRol', id).from('roles').first()
        if(!rolExists) return res.status(404).json({message: "Rol no encontrado"})
        const user = await db.select('*').where('idRol', id).from('users')
        if(!user) return res.status(404).json({message: "No hay usuarios con este rol"})
        res.status(200).json({message: user})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}


export const createUser = async (req, res) => {
    const {nombre, contraseña, rol} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassWord = await bcrypt.hash(contraseña, salt)
    try{
        if(!nombre || !contraseña) return res.status(400).json({message: "Uno o más campos vacios"})
        let rolId;
        if(rol) {
            if(isNaN(rol)) return res.status(500).json({message: "Debes introducir el id del rol como número"})
            const {idRol} = await db.select('idRol').where('idRol', rol).from('roles').first()
            if(!idRol) return res.status(404).json({message: "Rol no encontrado"})
            rolId = idRol;
        }
        else{
            const {idRol} = await db.select('idRol').where('nombre', 'usuario').from('roles').first()
            if(!idRol) return res.status(404).json({message: "Rol no encontrado"})
            rolId = idRol;
        }

        const usuario = await db('users').insert({nombre, contraseña: hashedPassWord, idRol: rolId})
        if(!usuario) return res.status(500).json({message: "Error al crear el usuario"})
        return res.status(200).json({message: "Usuario creado correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }

}


export const updateUser = async (req, res) => {
    try{
        const {id} = req.params
        const userExists = await db.select('*').where('idUser', id).from('users').first()
        if(!userExists) return res.status(404).json({message: "Usuario no encontrado"})
        const {
            nombre = userExists.nombre,
            contraseña = userExists.contraseña,
            idRol = userExists.idRol
        } = req.body

        let hashedPassWord = contraseña
        if(contraseña !== userExists.contraseña) {
            const salt = await bcrypt.genSalt(10)
            hashedPassWord = await bcrypt.hash(contraseña, salt)
        }

        if(idRol !== userExists.idRol) {
            const rolExists = await db.select('idRol').where('idRol', idRol).from('roles').first()
            if(!rolExists) return res.status(404).json({message: "Rol no encontrado"})
        }

        const userUpdated = await db('users').update({
            nombre,
            contraseña: hashedPassWord,
            idRol
        })

        if(!userUpdated) return res.status(404).json({message: "Error al actualizar datos de usuario"})
        return res.status(200).json({message: "Usuario actualizado correctamente"})

    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
export const deleteUser = async (req, res) => {
    try{
        const {id} = req.params 
        const userExists = await db.select('*').where('idUser', id).from('users').first()
        if(!userExists) return res.status(404).json({message: "Usuario no encontrado"})
        await db('users').where('idUser', id).del()
        res.status(200).json({message: "Usuario eliminado correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}