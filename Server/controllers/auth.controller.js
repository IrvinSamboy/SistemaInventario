import {db} from '../models/db.js'
import bcrypt from 'bcrypt'

export const singup = async (req, res) => {
    const {nombre, contraseña, rol} = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassWord = await bcrypt.hash(contraseña, salt)
    try{
        if(!nombre || !contraseña) return res.status(400).json({message: "Uno o más campos vacios"})
        let rolId;
        if(rol) {
            const {idRol} = await db.select('idRol').where('nombre', rol).from('roles').first()
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
        res.status(500).json({message: error})
        console.log(error)
    }

}
