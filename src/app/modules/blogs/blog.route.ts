import express from 'express'
import { validation } from '../../middleware/validateRequest'
import { blogValidation } from './blog.validation'
import { blogController } from './blog.controller'
import auth from '../../middleware/auth'
import { USER_Role } from '../user/user.constant'

const router = express.Router()

router.post(
    '/',
    auth(USER_Role.user),
    validation(blogValidation.blogValidationSchema),
    blogController.createBlog
)
router.patch(
    '/:id',
    auth(USER_Role.user),
    validation(blogValidation.updateBlogValidationSchema),
    blogController.updateBlog
)
router.delete(
    '/:id',
    auth(USER_Role.admin, USER_Role.user),
    blogController.deleteBlog
)
router.get(
    '/',
    auth(USER_Role.admin, USER_Role.user),
    blogController.getAllBlogs
)
export const blogRoutes = router
