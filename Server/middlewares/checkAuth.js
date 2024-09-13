import {db} from '../models/db.js'
import {verifyToken} from '../utils/token.js'

export const checkAuth = (roles) => async (req, res, next) => {

    try {
        const token = req.cookies.token
        if(!token) res.status(403).json({message: "Sin autorización, no ha iniciado sesión"})
        const tokenVerifyed = await verifyToken(token)
        if(!tokenVerifyed) res.status(403).json({message: "Sin autorización, token de sesión incorrecto"})
        
        if(roles.length === 0) return next()
        
        let error = false
        let rolDoesExists = ''
        let idRoles = []
        for(const rol of roles){
            const rolExists = await db.select('idRol').where('nombre', rol).from('roles').first()
            if(!rolExists){
                error = true
                rolDoesExists = rol
                break
            }
            idRoles.push(rolExists.idRol)
            console.log(idRoles)
        }
        if(error) return res.status(404).json({message: `Error, el rol ${rolDoesExists} no encontrado`})        

        let match = false 
        for(const idRol of idRoles) {
            if(idRol === tokenVerifyed.idRol) {
                match = true
                break
            } 
            match = false
        }

        if(!match) return res.status(403).json({message: "No tienes suficientes permisos para acceder"})
        next()
    
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}



