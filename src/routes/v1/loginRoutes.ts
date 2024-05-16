import express from 'express'
import loginController from '../../controllers/v1/auth/loginController'
// import userStore from '../../validations/userStore'

const router = express.Router()

router.post('/', loginController.login)

export default router
