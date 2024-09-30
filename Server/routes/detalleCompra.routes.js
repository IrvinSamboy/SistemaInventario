import { Router } from "express";
import * as detallesCompraController from '../controllers/detallesCompra.controller.js'
import {checkAuth} from '../middlewares/checkAuth.js'

const router = Router()

router.get('/:id', checkAuth(["admin", "gerente", "usuario"]), detallesCompraController.getDetalles)
router.get('/detalle/:id', checkAuth(["admin", "gerente", "usuario"]), detallesCompraController.getDetalleByID)
router.post('/', checkAuth(["admin", "gerente", "usuario"]), detallesCompraController.addDetalle)
router.put('/:id', checkAuth(["admin", "gerente", "usuario"]), detallesCompraController.editDetalle)
router.delete('/:id', checkAuth(["admin", "gerente", "usuario"]), detallesCompraController.deleteDetalle)

export default router