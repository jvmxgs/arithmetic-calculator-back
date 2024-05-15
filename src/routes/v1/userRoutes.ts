import express from 'express'
import userController from '../../controllers/v1/userController'
import authMiddleware from '../../middlewares/authMiddleware'
import userStore from '../../validations/userStore'

const router = express.Router()

router.get('/', authMiddleware, userController.index)
router.post('/', authMiddleware, userStore, userController.store)

export default router
