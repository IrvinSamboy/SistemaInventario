import express from 'express'
import dotenv from 'dotenv' 
import morgan from "morgan"
import {verifyConnection} from "./models/db.js"
import {createRoles} from './utils/onServerStart.js'
import authRoutes from './routes/auth.routes.js'
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRoutes)

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
createRoles()