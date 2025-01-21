import config from '../../config'
import AppError from '../../Errors/AppError'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import httpStatus from 'http-status'
import { createToken } from './auth.utils'
const loginUserWithDB = async (payload: TLoginUser) => {
    const user = await User.isUserExists(payload?.email)
    console.log(user)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is not found')
    }
    const isUserBlock = user.isBlock
    if (isUserBlock) {
        throw new AppError(httpStatus.NOT_FOUND, 'User is Blocked')
    }
    console.log(payload?.password, user?.password)
    if (!(await User.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password dose not matched')
    const jwtPayload = {
        userEmail: user?.email,
        role: user?.role,
    }
    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        '1d'
    )

    return {
        accessToken,
    }
}

export const AuthServices = {
    loginUserWithDB,
}
