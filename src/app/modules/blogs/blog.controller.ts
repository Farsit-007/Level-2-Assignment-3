import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'
import { blogServices } from './blog.service'
import httpStatus from 'http-status'
const createBlog = catchAsync(async (req, res, next) => {
    const result = await blogServices.createBlogIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog created successfully',
        data: result,
    })
})

const updateBlog = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await blogServices.updateBlogsFromDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Blog updated successfully',
        data: result,
    })
})

const deleteBlog = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const result = await blogServices.deleteBlogFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: result,
    })
})

const getAllBlogs = catchAsync(async (req, res, next) => {
    console.log(req.query)
    const result = await blogServices.getAllBlogsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    })
})

export const blogController = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
}
