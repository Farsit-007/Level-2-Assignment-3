import express from 'express'
import { validation } from '../../middleware/validateRequest'
import { loginValidationSchema } from './auth.validation'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post(
    '/login',
    validation(loginValidationSchema),
    AuthController.loginUser
)

export const AuthRoutes = router
