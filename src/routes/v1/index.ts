import { Router } from 'express'
import additionRoutes from './additionRoutes'
import loginRoutes from './loginRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/login', loginRoutes)
router.use('/users', userRoutes)
router.use('/addition', additionRoutes)

export default router
