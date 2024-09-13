import {db} from '../models/db.js'

export const createRoles = async () => {
    try{
        const rolesExists = await db.select('*').from('roles')
        if(rolesExists.length > 0) return

        const newRoles = await Promise.all([
            db('roles').insert({nombre: "admin"}),
            db('roles').insert({nombre: "gerente"}),
            db('roles').insert({nombre: "usuario"})
        ])
        console.log(newRoles)
    }
    catch(error){
        console.log(error)
    }
}