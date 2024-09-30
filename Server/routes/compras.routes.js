import { Router } from "express";
import * as comprasController from '../controllers/compras.controller.js'
import {checkAuth} from '../middlewares/checkAuth.js'

const router = Router()

router.get('/', checkAuth(["admin", "gerente", "usuario"]), comprasController.getCompras)
router.get('/:id', checkAuth(["admin", "gerente", "usuario"]), comprasController.getCompraById)
router.get('/fecha/:fecha', checkAuth(["admin", "gerente", "usuario"]), comprasController.getCompraByDate)
router.post('/', checkAuth(["admin", "gerente", "usuario"]), comprasController.createCompra)
router.put('/:id', checkAuth(["admin", "gerente", "usuario"]), comprasController.updateCompra)
router.delete('/:id', checkAuth(["admin", "gerente", "usuario"]), comprasController.deleteCompra)
router.post('/factura/:idCompra',  checkAuth(["admin", "gerente", "usuario"]), comprasController.generarFactura)

export default router