import express from 'express'
import addtionController from '../../controllers/v1/addtionController'
import authMiddleware from '../../middlewares/authMiddleware'
import additionValidation from '../../validations/addition'

const router = express.Router()

router.post('/', authMiddleware, additionValidation, addtionController.invoke)

export default router
