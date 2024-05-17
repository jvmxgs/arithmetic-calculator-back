import express from 'express'
import multiplicationController from '../../controllers/v1/multiplicationController'
import authMiddleware from '../../middlewares/authMiddleware'
import commonOperationValidation from '../../validations/commonOperation'

const router = express.Router()

router.post('/', authMiddleware, commonOperationValidation, multiplicationController.invoke)

export default router
