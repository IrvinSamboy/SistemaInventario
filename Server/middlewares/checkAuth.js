import {db} from '../models/db.js'
import {verifyToken} from '../utils/token.js'

export const checkAuth = (rol) => async (req, res, next) => {

    try {
        const token = req.cookies.token
        if(!token) res.status(403).json({message: "Sin autorización, no ha iniciado sesión"})
        const tokenVerifyed = await verifyToken(token)
        if(!tokenVerifyed) res.status(403).json({message: "Sin autorización, token de sesión incorrecto"})
        
        if(!rol) return next()

        const rolExists = await db.select('idRol').where('nombre', rol).from('roles').first()
        if(!rolExists) res.status(403).json({message: "Rol no encontrado"})

        const {idRol} = tokenVerifyed

        if(idRol !== rolExists.idRol) res.status(403).json({message: "No tienes suficientes permisos para acceder"})
        next()
    
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}



