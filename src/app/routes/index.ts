import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { blogRoutes } from '../modules/blogs/blog.route'
import { AdminRoutes } from '../modules/admin/admin.route'
import { AuthRoutes } from '../modules/auth/auth.route'

const router = Router()

const moduleRoutes = [
    {
        path: '/auth',
        route: UserRoutes,
    },
    {
        path: '/blogs',
        route: blogRoutes,
    },
    {
        path: '/admin',
        route: AdminRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.route)
})

export default router
