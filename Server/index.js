import express from 'express'
import dotenv from 'dotenv' 
import morgan from "morgan"
import {verifyConnection} from "./models/db.js"

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(morgan('dev'))
app.use(express.json())

const setUpServer = async () => {
    try{
        await verifyConnection()
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`)
        })
    }
    catch(error){
        console.log(error)
    }
}

setUpServer()