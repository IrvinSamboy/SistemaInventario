import {db} from '../models/db.js'
import bcrypt from 'bcrypt'
import { createToken } from '../utils/token.js'

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

export const singin =  async (req, res) => {
    const {nombre, contraseña} = req.body
    try{
        if(!nombre, !contraseña) return res.status(400).json({message: "Uno o más campos vacios"})
        const userExists = await db.select('*').where('nombre', nombre).from('users').first()
        if(!userExists) return res.status(404).json({message: "Usuario no encontrado"})
        const passWordMatch = await bcrypt.compare(contraseña, userExists.contraseña)
        if(!passWordMatch) return res.status(404).json({message: "Contraseña incorrecta"})
        const {contraseña: password, ...userData} = userExists
        const token = createToken(userData)
        return res.status(200).cookie('token', token, {
                                                        httpOnly: true, 
                                                        secure: true, 
                                                        priority: 'high', 
                                                        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                                                    }).json({message: 'Usuario logueado correctamente'});

    }
    catch(error){
        console.log(error)
    }
}