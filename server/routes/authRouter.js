import { Router } from "express";
const router = new Router()
import AuthController from '../controllers/userController.js'
import authMiddleware from '../middleware/auth-middleware.js'

router.post('/auth/registration', AuthController.registration)
router.post('/auth/login', AuthController.login)
router.post('/auth/logout', AuthController.logout)
// router.get('/auth/activate/:link', AuthController.activate)
// router.get('auth/refresh', AuthController.refresh)
router.get('/checkauth', authMiddleware, AuthController.checkauth)
router.post('/setlessons', authMiddleware, AuthController.setlessons)
router.get('/getlessons', authMiddleware, AuthController.getlessons)
router.post('/setchildsles', authMiddleware, AuthController.setchildsles)
// router.get('/getchildren', authMiddleware, AuthController.getchildren)
router.get('/getusers', authMiddleware, AuthController.getusers)
router.get('/getmessages', authMiddleware, AuthController.getmessages)
// router.get('/checkAuth', authMiddleware, AuthController.checkAuth)

export default router