import express from 'express'
import loginController from '../../controllers/v1/auth/loginController'
import loginValidation from '../../validations/login'

const router = express.Router()

router.post('/', loginValidation, loginController.invoke)

export default router
