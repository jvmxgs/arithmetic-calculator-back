import { Router } from 'express'
import additionRoutes from './additionRoutes'
import divisionRoutes from './divisionRoutes'
import loginRoutes from './loginRoutes'
import multiplicationRoutes from './multiplicationRoutes'
import subtractionRoutes from './subtractionRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/login', loginRoutes)
router.use('/users', userRoutes)
router.use('/addition', additionRoutes)
router.use('/subtraction', subtractionRoutes)
router.use('/multiplication', multiplicationRoutes)
router.use('/division', divisionRoutes)

export default router
