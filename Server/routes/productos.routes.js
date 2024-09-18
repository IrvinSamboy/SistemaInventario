import { Router } from "express";
import * as productosControllers from '../controllers/productos.controller.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router()

router.get('/', checkAuth(["admin", "gerente", "usuario"]), productosControllers.getProducto)
router.get('/:id', checkAuth(["admin", "gerente", "usuario"]), productosControllers.getProductoById)
router.get('/categoria/:id', checkAuth(["admin", "gerente", "usuario"]), productosControllers.getProductosByCategoria)
router.post('/', checkAuth(["admin", "gerente", "usuario"]), productosControllers.createProducto)
router.put('/:id', checkAuth(["admin", "gerente", "usuario"]), productosControllers.updateProducto)
router.delete('/:id', checkAuth(["admin", "gerente", "usuario"]), productosControllers.deleteProducto)
router.delete('/categoria/:id', checkAuth(["admin", "gerente", "usuario"]), productosControllers.deleteProductoByCategoria)

export default router