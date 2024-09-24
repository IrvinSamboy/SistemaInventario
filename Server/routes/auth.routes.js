import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'
import {checkAuth} from '../middlewares/checkAuth.js'

const router = Router()

router.post('/signin', authController.signin)
router.get('/logout', authController.logOut)
router.get('/verifyLogin', checkAuth([]), (req, res) => {
    res.status(200).json({message: "Usuario logueado"})
})

export default router;
