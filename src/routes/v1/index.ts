import { Router } from 'express'
import additionRoutes from './additionRoutes'
import divisionRoutes from './divisionRoutes'
import loginRoutes from './loginRoutes'
import multiplicationRoutes from './multiplicationRoutes'
import randomStringRoutes from './randomStringRoutes'
import recordRoutes from './recordRoutes'
import sqrtRoutes from './sqrtRoutes'
import subtractionRoutes from './subtractionRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/addition', additionRoutes)
router.use('/division', divisionRoutes)
router.use('/login', loginRoutes)
router.use('/multiplication', multiplicationRoutes)
router.use('/random-string', randomStringRoutes)
router.use('/records', recordRoutes)
router.use('/sqrt', sqrtRoutes)
router.use('/subtraction', subtractionRoutes)
router.use('/users', userRoutes)

export default router
