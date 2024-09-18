import { Router } from "express";
import * as categoriasController from '../controllers/categorias.controller.js'
import { checkAuth } from '../middlewares/checkAuth.js';

const router = Router()

router.get('/', checkAuth(["admin", "gerente", "usuario"]), categoriasController.getCategorias)
router.get('/:id', checkAuth(["admin", "gerente", "usuario"]), categoriasController.getCategoriaById)
router.post('/', checkAuth(["admin", "gerente", "usuario"]), categoriasController.createCategoria)
router.put('/:id', checkAuth(["admin", "gerente", "usuario"]), categoriasController.updateCategoria)
router.delete('/:id', checkAuth(["admin", "gerente", "usuario"]), categoriasController.deleteCategoria)

export default router