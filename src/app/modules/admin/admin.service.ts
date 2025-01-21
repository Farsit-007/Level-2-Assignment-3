import AppError from '../../Errors/AppError'
import { Blog } from '../blogs/blog.model'
import { User } from '../user/user.model'
import httpStatus from 'http-status'
const blockUserFromDB = async (id: string) => {
    const blockUser = await User.findByIdAndUpdate(
        id,
        { isBlock: true },
        {
            new: true,
            runValidators: true,
        }
    )
    if (!blockUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to block user')
    }
    return blockUser
}

const DeleteBlogFromDB = async (id: string) => {
    const deleteUser = await Blog.findByIdAndDelete(id)
    if (!deleteUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }
    return deleteUser
}

export const adminServices = {
    blockUserFromDB,
    DeleteBlogFromDB,
}
