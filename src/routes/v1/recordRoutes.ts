import express from 'express'
import recordController from '../../controllers/v1/recordController'
import authMiddleware from '../../middlewares/authMiddleware'

const router = express.Router()

router.get('/', authMiddleware, recordController.index)

export default router
