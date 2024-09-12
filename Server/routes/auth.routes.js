import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'

const router = Router()

router.post('/singup', authController.singup)
router.post('/singin', authController.singin)

export default router;
