import express from 'express'
import randomStringController from '../../controllers/v1/randomStringController'
import authMiddleware from '../../middlewares/authMiddleware'
import randomStringValidation from '../../validations/randomString'

const router = express.Router()

router.post('/', authMiddleware, randomStringValidation, randomStringController.invoke)

export default router
