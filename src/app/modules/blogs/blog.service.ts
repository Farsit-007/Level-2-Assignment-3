import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../Errors/AppError'
import { User } from '../user/user.model'
import { blogSearchAbleFields } from './blog.constant'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import httpStatus from 'http-status'

// Create Blogs
const createBlogIntoDB = async (payload: TBlog, author: string) => {
    const isUserExists = await User.findOne({ email: author }) // Searching the author is exist or not.
    const isUserBlocked = isUserExists?.isBlock // Check the user is blocked or not.
    if (isUserBlocked) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Your account is blocked,Cannot create blogs'
        )
    }
    // Set the author id dynamically
    payload.author = isUserExists!._id // 'isUserExists' is possibly 'null'. Solve => Used Type Assertion (!) Resource ChatGpt
    const result = await Blog.create(payload)
    return result
}

// Update Blogs
const updateBlogsFromDB = async (
    id: string,
    payload: Partial<TBlog>,
    author: string
) => {
    const isUserMatched = await User.findOne({ email: author }) // Search for the logged in user is valid owner or not
    const isBlogExists = await Blog.findById(id) // Check is the blogs is exists or not
    if (!isBlogExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blogs is not found')
    }

    // Check if the login user and the blogs author are same or not
    if (isBlogExists.author.toString() !== isUserMatched!._id.toString()) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'You are not authorized.Please try with your valid account'
        )
    }
    const result = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
    return result
}

// Delete Blogs
const deleteBlogFromDB = async (id: string, author: string) => {
    const isUserMatched = await User.findOne({ email: author }) // Search for the logged in user is valid owner or not
    const isBlogExists = await Blog.findById(id) // Check is the blogs is exists or not
    if (!isBlogExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blogs is not found')
    }

    // Check if the login user and the blogs author are same or not
    if (isBlogExists.author.toString() !== isUserMatched!._id.toString()) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'You are not authorized.Please try with your valid account'
        )
    }
    const result = await Blog.findByIdAndDelete(id)
    return result
}

// Find All Blogs With The Query Builder
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(Blog.find(), query)
        .search(blogSearchAbleFields)
        .sort()
        .filter()
    const result = await blogQuery.modelQuery.populate('author') // Populating the author details
    return result
}

export const blogServices = {
    createBlogIntoDB,
    updateBlogsFromDB,
    deleteBlogFromDB,
    getAllBlogsFromDB,
}
