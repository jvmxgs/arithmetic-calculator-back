import express from 'express'
import userController from '../../controllers/v1/userController'
import loginController from '../../controllers/v1/auth/loginController'
import authMiddleware from '../../middlewares/authMiddleware'
import userStore from '../../validations/userStore'

const router = express.Router()

router.post('/login', loginController.login)

// user routes
router.get('/users', authMiddleware, userController.index)
router.post('/users', authMiddleware, userStore, userController.store)

export default router
