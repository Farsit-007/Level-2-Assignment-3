import mongoose from 'mongoose'
import { TErrorSecure, TGenericErrorResponse } from '../interface/error'

const handleValidationError = (
    err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
    const details = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: val?.path,
                message: val?.message,
            }
        }
    )

    const error: TErrorSecure = {
        details: {
            path: details[0].path,
            message: details[0].message,
        },
    }

    const statusCode = 400
    return {
        statusCode,
        message: 'Validation Error',
        error,
    }
}

export default handleValidationError
