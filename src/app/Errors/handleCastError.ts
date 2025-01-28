import mongoose from 'mongoose'
import { TErrorSecure, TGenericErrorResponse } from '../interface/error'

const handleCastError = (
    err: mongoose.Error.CastError
): TGenericErrorResponse => {
    const details = {
        path: err.path,
        message: err.message,
    }
    const error: TErrorSecure = {
        details,
    }
    const statusCode = 400
    return {
        statusCode,
        message: 'Invalid Id ',
        error,
    }
}

export default handleCastError
