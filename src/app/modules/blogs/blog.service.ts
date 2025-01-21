import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../Errors/AppError'
import { User } from '../user/user.model'
import { blogSearchAbleFields } from './blog.constant'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import httpStatus from 'http-status'
const createBlogIntoDB = async (payload: TBlog) => {
    const isUserExists = await User.findById(payload.author)
    const isUserBlocked = isUserExists?.isBlock
    if (isUserBlocked) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            'Your account is blocked,Cannot create blogs'
        )
    }
    const result = await Blog.create(payload)
    return result
}

const updateBlogsFromDB = async (id: string, payload: Partial<TBlog>) => {
    const isBlogExists = await Blog.findById(id)
    if (!isBlogExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blogs is not found')
    }

    const result = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
    return result
}

const deleteBlogFromDB = async (id: string) => {
    const isBlogExists = await Blog.findById(id)
    if (!isBlogExists) {
        throw new AppError(httpStatus.NOT_FOUND, 'Blogs is not found')
    }

    const result = await Blog.findByIdAndDelete(id)
    return result
}

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(Blog.find(), query)
        .search(blogSearchAbleFields)
        .sort()
        .filter()
    const result = await blogQuery.modelQuery
    return result
}

export const blogServices = {
    createBlogIntoDB,
    updateBlogsFromDB,
    deleteBlogFromDB,
    getAllBlogsFromDB,
}
