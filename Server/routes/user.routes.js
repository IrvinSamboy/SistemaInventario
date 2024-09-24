import { Router } from "express";
import * as userController from '../controllers/users.controller.js'
import {checkAuth} from '../middlewares/checkAuth.js'

const router = Router()

router.get('/', checkAuth(["admin"]), userController.getUsers)
router.get('/:id', checkAuth(["admin"]), userController.getUserById)
router.get('/rol/:id', checkAuth(["admin"]), userController.getUserByRol)
router.post('/', checkAuth(["admin"]), userController.createUser)
router.put('/', checkAuth(["admin"]), userController.updateUser)
router.delete('/', checkAuth(["admin"]), userController.deleteUser)

export default router