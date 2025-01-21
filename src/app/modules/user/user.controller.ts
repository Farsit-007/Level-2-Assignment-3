import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { UserServices } from './user.service'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res, next) => {
    const result = await UserServices.createUserIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result,
    })
})

export const UserController = {
    createUser,
}
