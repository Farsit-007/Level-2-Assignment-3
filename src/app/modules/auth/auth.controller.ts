import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { AuthServices } from './auth.service'
import httpStatus from 'http-status'
const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUserWithDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    })
})

export const AuthController = { loginUser }
