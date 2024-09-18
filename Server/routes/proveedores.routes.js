import { Router } from "express";
import * as proveedoresControllers from '../controllers/proveedores.controller.js'
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router()

router.get('/', checkAuth(["admin", "gerente", "usuario"]), proveedoresControllers.getProveedores)
router.get('/:id', checkAuth(["admin", "gerente", "usuario"]), proveedoresControllers.getProveedorById)
router.post('/', checkAuth(["admin", "gerente"]), proveedoresControllers.createProveedor)
router.put('/:id', checkAuth(["admin", "gerente"]), proveedoresControllers.updateProveedor)
router.delete('/:id', checkAuth(["admin", "gerente"]), proveedoresControllers.deleteProveedor)

export default router