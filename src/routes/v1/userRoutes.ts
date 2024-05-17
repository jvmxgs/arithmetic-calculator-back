import express from 'express'
import userController from '../../controllers/v1/userController'
import authMiddleware from '../../middlewares/authMiddleware'
import userStoreValidation from '../../validations/userStore'

const router = express.Router()

router.get('/', authMiddleware, userController.index)
router.post('/', authMiddleware, userStoreValidation, userController.store)

export default router
