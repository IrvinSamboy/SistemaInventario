import {db} from '../models/db.js'
import bcrypt from 'bcrypt'
import { createToken } from '../utils/token.js'


export const signin =  async (req, res) => {
    const {nombre, contraseña} = req.body
    try{
        if(!nombre, !contraseña) return res.status(400).json({message: "Uno o más campos vacios"})
        const userExists = await db.select('*').where('nombre', nombre).from('users').first()
        if(!userExists) return res.status(404).json({message: "Usuario no encontrado"})
        const passWordMatch = await bcrypt.compare(contraseña, userExists.contraseña)
        if(!passWordMatch) return res.status(404).json({message: "Contraseña incorrecta"})
        const {contraseña: password, ...userData} = userExists
        const token = await createToken(userData)
        return res.status(200).cookie('token', token, {
                                                        httpOnly: true, 
                                                        secure: true, 
                                                        priority: 'high', 
                                                        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
                                                    }).json({message: 'Usuario logueado correctamente'});

    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const logOut = async (req, res) => {
    try{
        res.status(200).clearCookie('token', {
            httpOnly: true,
            secure: true,
        }).json({message: 'Sesión cerrada'});
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

