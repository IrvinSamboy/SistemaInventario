import { Router } from "express";
import * as empleadosController from '../controllers/empleados.controller.js';
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router();

// Rutas CRUD de empleados
router.get('/empleados', checkAuth(["admin", "user"]), empleadosController.getEmpleados);
router.get('/empleados/:id', checkAuth(["admin", "user"]), empleadosController.getEmpleadoById);
router.post('/empleados', checkAuth(["admin"]), empleadosController.createEmpleado);
router.put('/empleados/:id', checkAuth(["admin"]), empleadosController.updateEmpleado);
router.delete('/empleados/:id', checkAuth(["admin"]), empleadosController.deleteEmpleado);

export default router;
