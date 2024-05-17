import express from 'express'
import divisionController from '../../controllers/v1/divisionController'
import authMiddleware from '../../middlewares/authMiddleware'
import divisionValidation from '../../validations/division'

const router = express.Router()

router.post('/', authMiddleware, divisionValidation, divisionController.invoke)

export default router
