import express from 'express'
import { AdminControllers } from './admin.controller'
import auth from '../../middleware/auth'
import { USER_Role } from '../user/user.constant'

const router = express.Router()

router.patch(
    '/users/:userId/block',
    auth(USER_Role.admin),
    AdminControllers.blockUser
)

router.delete('/blogs/:id', auth(USER_Role.admin), AdminControllers.DeleteBlogs)

export const AdminRoutes = router
