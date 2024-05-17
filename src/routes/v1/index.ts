import { Router } from 'express'
import additionRoutes from './additionRoutes'
import divisionRoutes from './divisionRoutes'
import loginRoutes from './loginRoutes'
import multiplicationRoutes from './multiplicationRoutes'
import squareRootRoutes from './squareRootRoutes'
import subtractionRoutes from './subtractionRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/addition', additionRoutes)
router.use('/division', divisionRoutes)
router.use('/login', loginRoutes)
router.use('/multiplication', multiplicationRoutes)
router.use('/square-root', squareRootRoutes)
router.use('/subtraction', subtractionRoutes)
router.use('/users', userRoutes)

export default router
