import express from 'express'
import subtractionController from '../../controllers/v1/subtractionController'
import authMiddleware from '../../middlewares/authMiddleware'
import commonOperationValidation from '../../validations/commonOperation'

const router = express.Router()

router.post('/', authMiddleware, commonOperationValidation, subtractionController.invoke)

export default router
