import { Router } from "express";
const router = new Router()
import AuthController from '../controllers/userController.js'
import authMiddleware from '../middleware/auth-middleware.js'
import homeController from "../controllers/homeController.js";
import chatController from "../controllers/chatController.js";
import scheduleController from "../controllers/scheduleController.js";

router.post('/auth/registration', AuthController.registration)
router.post('/auth/login', AuthController.login)
router.post('/auth/logout', AuthController.logout)
router.get('/checkauth', authMiddleware, AuthController.checkauth)
router.post('/setlessons', authMiddleware, homeController.setlessons)
router.get('/getlessons', authMiddleware, homeController.getlessons)
router.post('/setchildsles', authMiddleware, homeController.setchildsles)
router.get('/getusers', authMiddleware, AuthController.getusers)
router.post('/getmessages', authMiddleware, chatController.getmessages)
router.get('/getchildren', authMiddleware, AuthController.getchildren)
router.post('/setschedule', authMiddleware, scheduleController.setschedule)
router.post('/getschedule', authMiddleware, scheduleController.getschedule)

export default router