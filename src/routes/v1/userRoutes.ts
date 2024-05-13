import express from 'express'
import userController from '../../controllers/v1/userController'
import authMiddleware from '../../middlewares/authMiddleware'

const router = express.Router()

router.get('/', authMiddleware, userController.getUsers)

export default router
