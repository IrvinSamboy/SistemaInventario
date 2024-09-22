import { Router } from "express";
import * as comprasController from '../controllers/compras.controller'
import {checkAuth} from '../middlewares/checkAuth'

const router = Router()

router.post('/', checkAuth(["admin", "gerente", "usuario"]), comprasController.createCompra)
router.put('/:id', checkAuth(["admin", "gerente", "usuario"]), comprasController.updateCompra)
router.delete('/:id', checkAuth(["admin", "gerente", "usuario"]), comprasController.deleteCompra)

export default router