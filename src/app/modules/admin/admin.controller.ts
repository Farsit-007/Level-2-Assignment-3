import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { adminServices } from './admin.service'
import httpStatus from 'http-status'
const blockUser = catchAsync(async (req, res) => {
    const { userId } = req.params
    const result = await adminServices.blockUserFromDB(userId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User blocked successfully',
    })

    res.send()
})
const DeleteBlogs = catchAsync(async (req, res) => {
    const { id } = req.params
    const result = await adminServices.DeleteBlogFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
    })
})

export const AdminControllers = {
    blockUser,
    DeleteBlogs,
}
