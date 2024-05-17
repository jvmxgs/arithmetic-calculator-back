import { Router } from 'express'
import additionRoutes from './additionRoutes'
import loginRoutes from './loginRoutes'
import subtractionRoutes from './subtractionRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/login', loginRoutes)
router.use('/users', userRoutes)
router.use('/addition', additionRoutes)
router.use('/subtraction', subtractionRoutes)

export default router
