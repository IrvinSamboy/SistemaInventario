import {db} from '../models/db.js'
import getToken from '../utils/getToken.js'
export const createCompra = async (req, res) => {
    try{
        const {idProveedor} = req.body
        if(!idProveedor) return res.status(400).json({message: "Tienes que introducir un proveedor"})
        const fecha = new Date()
        const {idUser} = getToken(req.cookies.token)
        const newCompra = db('compras').insert({idProveedor, fecha, idUser})
        if(!newCompra) return res.status(500).json({message: "Ha ocurrido un error al crearla compra"})
        return res.status(200).json({message: "Compra creada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}