import { Router } from 'express'
import loginRoutes from './loginRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/login', loginRoutes)
router.use('/users', userRoutes)

export default router
