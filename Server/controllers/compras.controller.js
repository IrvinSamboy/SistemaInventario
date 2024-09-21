import {db} from '../models/db.js'

export const createCompra = async (req, res) => {
    try{
        
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}