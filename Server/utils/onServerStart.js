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

        const adminExists = await db.select('*').from('users')
        if(adminExists.length > 0) return

        const createAdmin = await db('users').insert({nombre: "admin", contraseña: '$2a$10$nTJAQsCE0OoBTwUTkLDfM.awMSw4fh.AH5eyIhVLePO20T9m.6n6G' , idRol: newRoles[0]})

        console.log(createAdmin)
        console.log(newRoles)
    }
    catch(error){
        console.log(error)
    }
}