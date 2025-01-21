import express from 'express'
import { validation } from '../../middleware/validateRequest'
import { UserValidation } from './user.validation'
import { UserController } from './user.controller'
const router = express.Router()

router.post(
    '/register',
    validation(UserValidation.userValidationSchema),
    UserController.createUser
)

export const UserRoutes = router
