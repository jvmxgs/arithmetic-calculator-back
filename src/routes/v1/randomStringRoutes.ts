import express from 'express'
import randomStringController from '../../controllers/v1/randomStringController'
import authMiddleware from '../../middlewares/authMiddleware'

const router = express.Router()

router.post('/', authMiddleware, randomStringController.invoke)

export default router
