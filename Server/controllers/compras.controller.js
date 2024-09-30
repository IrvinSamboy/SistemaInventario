import {db} from '../models/db.js'
import getToken from '../utils/getToken.js'

export const getCompras = async (req, res) => {
    try{
        const compras = await db.select('compras.*', 'proveedores.nombre as nombreProveedor', 'users.nombre as nombreUsuario')
        .from('compras')
        .join('users', 'users.IdUser', 'compras.IdUser')
        .join('proveedores', 'proveedores.idProveedor', 'compras.idProveedor')
        if(compras.length === 0) return res.status(404).json({message: "No tienes compras en el sistema"})
        res.status(200).json({message: compras})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getCompraById = async (req, res) => {
    try{
        const {id} = req.params
        const compra = await db.select('compras.*', 'proveedores.nombre as nombreProveedor', 'users.nombre as nombreUsuario')
        .where('compras.idCompra', id)
        .from('compras')
        .join('users', 'users.IdUser', 'compras.IdUser')
        .join('proveedores', 'proveedores.idProveedor', 'compras.idProveedor')
        .first();
        if(!compra) return res.status(404).json({message: "Compra no encontrada"})
        res.status(200).json({message: compra})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getCompraByDate = async (req, res) => {
    try{
        const {fecha} = req.params
        const compra = await db.select('compras.*', 'proveedores.nombre as nombreProveedor', 'users.nombre as nombreUsuario')
        .where('fecha', 'like', `${fecha}%`)
        .from('compras')
        .join('users', 'users.IdUser', 'compras.IdUser')
        .join('proveedores', 'proveedores.idProveedor', 'compras.idProveedor')
        .first();
        if(!compra) return res.status(404).json({message: "No hay compras en esta fecha"})
        res.status(200).json({message: compra})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const createCompra = async (req, res) => {
    try{
        const {idProveedor} = req.body
        if(!idProveedor) return res.status(400).json({message: "Tienes que introducir un proveedor"})
        const proveedor = await db.select('*').where('idProveedor', idProveedor).from('proveedores').first()
        if(!proveedor) return res.status(500).json({message: "Proveedor no encontrado"})
        const fecha = new Date()
        const {idUser} = await getToken(req.cookies.token)
        const newCompra = await db('compras').insert({idProveedor, fecha, idUser})
        if(!newCompra) return res.status(500).json({message: "Ha ocurrido un error al crearla compra"})
        return res.status(200).json({message: "Compra creada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const updateCompra = async (req, res) => {
    try{
        const {id} = req.params
        const compra = await db.select('*').where('idCompra', id).from('compras').first()
        if(!compra) return res.status(500).json({message: "Compra no encontrada"})
        const {
                idProveedor = compra.idProveedor
            } = req.body
        const proveedor = await db.select('*').where('idProveedor', idProveedor).from('proveedores').first()
        if(!proveedor) return res.status(500).json({message: "Proveedor no encontrado"})
        const proveedorUpdated = await db('compras').update({idProveedor}).where('idCompra', id)
        if(!proveedorUpdated) return res.status(500).json({message: "Ha ocurrido un error al crearla compra"})
        return res.status(200).json({message: "Compra editada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const deleteCompra = async (req, res) => {
    try{
        const {id} = req.params
        const compra = await db.select('*').where('idCompra', id).from('compras').first()
        if(!compra) return res.status(500).json({message: "Compra no encontrada"})
        await db('compras').where('idCompra', id).del()
        return res.status(200).json({message: "Compra eliminada correctamente"})
    }
    catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const generarFactura = async (req, res) => {
    try{
        const trx = await db.transaction();
        const {idCompra} = req.params
        const reporte = await trx.select('*').where('idCompra', idCompra).from('reportes').first()
        if(reporte) {
            await trx('reportes').where('idCompra', idCompra).del()
        }
        const compra = await trx.select('compras.*', 'proveedores.nombre as nombreProveedor', 'users.nombre as nombreUsuario')
        .where('compras.idCompra', idCompra)
        .from('compras')
        .join('users', 'users.IdUser', 'compras.IdUser')
        .join('proveedores', 'proveedores.idProveedor', 'compras.idProveedor')
        .first();

        if (!compra) {
            await trx.rollback();
            return res.status(404).json({ message: "Error al encontrar la compra asociada a esta factura" });
        }

        const detallesCompra = await trx.select('detallesCompra.*', 'productos.nombre as nombreProducto')
            .where('detallesCompra.idCompra', idCompra)
            .from('detallesCompra')
            .join('productos', 'productos.idProducto', 'detallesCompra.idProducto');

        if (detallesCompra.length === 0) {
            await trx.rollback();
            return res.status(404).json({ message: "Esta compra no tiene productos" });
        }
        console.log(compra)
        const [reporteId] = await trx('reportes').insert({
            idCompra: idCompra,
            fecha: compra.fecha,
            total: compra.total,
            idProveedor: compra.idProveedor,
            nombreProveedor: compra.nombreProveedor,
            idUser: compra.idUser,
            nombreUsuario: compra.nombreUsuario,
        });

        for (const detalleCompra of detallesCompra) {
            await trx('detalleReporte').insert({
                idReporte: reporteId,
                idProducto: detalleCompra.idProducto,
                nombreProducto: detalleCompra.nombreProducto,
                cantidad: detalleCompra.cantidad,
                precioUnitario: detalleCompra.precioUnitario,
            });
        }

        await trx.commit();
        return res.status(200).json({ message: "Factura creada correctamente" });
    } catch (error) {
        await trx.rollback();
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};