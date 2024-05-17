import express from 'express'
import sqrtController from '../../controllers/v1/sqrtController'
import authMiddleware from '../../middlewares/authMiddleware'
import sqrtValidation from '../../validations/sqrt'

const router = express.Router()

router.post('/', authMiddleware, sqrtValidation, sqrtController.invoke)

export default router
