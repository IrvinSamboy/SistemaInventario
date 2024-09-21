import { verifyToken } from "./token";

export default getToken = async (token) => {
    try{
        if(!token) return false
        const tokenVerifyed = await verifyToken(token)
        if(!tokenVerifyed) return false 

        return tokenVerifyed
        
    }
    catch(error){
        console.log(error)
    }
}