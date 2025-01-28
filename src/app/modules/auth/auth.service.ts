import config from '../../config'
import AppError from '../../Errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
const loginUserWithDB = async (payload: TLoginUser) => {
    const user = await User.isUserExists(payload?.email) // Check User exist or not with the Statics method
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
    }
    const isUserBlock = user.isBlock
    if (isUserBlock) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is Blocked')
    }

    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        // Check if the password same or not
        throw new AppError(httpStatus.FORBIDDEN, 'Invalid credentials')
    const jwtPayload = {
        userEmail: user?.email,
        role: user?.role,
    }
    // Make a  access token for login
    const token = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        '1d'
    )

    return {
        token,
    }
}

export const AuthServices = {
    loginUserWithDB,
}
