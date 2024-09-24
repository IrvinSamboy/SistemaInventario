import express from 'express'
import dotenv from 'dotenv' 
import morgan from "morgan"
import {verifyConnection} from "./models/db.js"
import {createRoles} from './utils/onServerStart.js'
import authRoutes from './routes/auth.routes.js'
import empleadosRoutes from './routes/empleados.routes.js';
import proveedoresRoutes from './routes/proveedores.routes.js'
import categoriasRoutes from './routes/categorias.routes.js'
import productosRoutes from './routes/productos.routes.js'
import comprasRoutes from './routes/compras.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/proveedores', proveedoresRoutes)
app.use('/api/categorias', categoriasRoutes)
app.use('/api/productos', productosRoutes)
app.use('/api/compra', comprasRoutes)
app.use('/api/users', userRoutes)

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