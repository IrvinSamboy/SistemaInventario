import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'
import {checkAuth} from '../middlewares/checkAuth.js'

const router = Router()

router.post('/singup', checkAuth(["admin"]) ,authController.singup)
router.post('/singin', authController.singin)
router.get('/logout', authController.logOut)

export default router;
