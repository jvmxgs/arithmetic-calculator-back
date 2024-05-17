import express from 'express'
import addtionController from '../../controllers/v1/addtionController'
import additionValidation from '../../validations/addition'

const router = express.Router()

router.post('/', additionValidation, addtionController.invoke)

export default router
