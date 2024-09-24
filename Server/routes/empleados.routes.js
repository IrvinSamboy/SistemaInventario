import { Router } from "express";
import * as empleadosController from '../controllers/empleados.controller.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

// Rutas CRUD de empleados
router.get('/', checkAuth(["admin", "usuario"]), empleadosController.getEmpleados);
router.get('/:id', checkAuth(["admin", "usuario"]), empleadosController.getEmpleadoById);
router.post('/', checkAuth(["admin"]), empleadosController.createEmpleado);
router.put('/:id', checkAuth(["admin"]), empleadosController.updateEmpleado);
router.delete('/:id', checkAuth(["admin"]), empleadosController.deleteEmpleado);

export default router;
