import express from 'express'
import squareRootController from '../../controllers/v1/squareRootController'
import authMiddleware from '../../middlewares/authMiddleware'
import squareRootValidation from '../../validations/squareRoot'

const router = express.Router()

router.post('/', authMiddleware, squareRootValidation, squareRootController.invoke)

export default router
