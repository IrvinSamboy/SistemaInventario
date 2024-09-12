import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config()

export const createToken = async (data) => {
    try{
        const token = await jwt.sign(data, process.env.TOKENSECRET)
        return token
    }
    catch(error){
        console.log(error)
    }
}

export const verifyToken = async (token) =>{
    try{
        const tokenVerifyed = jwt.verify(token, process.env.TOKENSECRET)
        return tokenVerifyed;
    }
    catch(error){
        console.log(error)
    }
} 