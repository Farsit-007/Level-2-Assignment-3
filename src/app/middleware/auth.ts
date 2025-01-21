import { NextFunction, Request, Response } from 'express'
import { catchAsync } from '../utils/catchAsync'
import AppError from '../Errors/AppError'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { TUserRole } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'
const auth = (...requestedRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req?.headers?.authorization?.split(' ')[1]
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You not authorized'
                )
            }
            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string
            ) as JwtPayload

            const { role, userEmail } = decoded

            const user = await User.isUserExists(userEmail)
            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
            }
            const isUserBlock = user.isBlock
            if (isUserBlock) {
                throw new AppError(httpStatus.NOT_FOUND, 'User is Blocked')
            }

            if (requestedRoles && !requestedRoles?.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You not authorized'
                )
            }
            req.user = decoded

            next()
        }
    )
}
export default auth
