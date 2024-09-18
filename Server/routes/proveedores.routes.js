import { Router } from "express";
import * as proveedoresControllers from '../controllers/proveedores.controller.js'
import { checkAuth } from "../middlewares/checkAuth.js";

const router = Router()

router.get('/', checkAuth(["admin", "gerente", "user"]), proveedoresControllers.getProveedores)
router.get('/:id', checkAuth(["admin", "gerente", "user"]), proveedoresControllers.getProveedorById)
router.post('/', checkAuth(["admin", "gerente"]), proveedoresControllers.createProveedor)
router.put('/', checkAuth(["admin", "gerente"]), proveedoresControllers.updateProveedor)
router.delete('/', checkAuth(["admin", "gerente"]), proveedoresControllers.deleteProveedor)

export default router