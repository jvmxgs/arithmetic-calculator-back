import express from 'express'
import addtionController from '../../controllers/v1/addtionController'
import authMiddleware from '../../middlewares/authMiddleware'
import commonOperationValidation from '../../validations/commonOperation'

const router = express.Router()

router.post('/', authMiddleware, commonOperationValidation, addtionController.invoke)

export default router
