import { ZodError, ZodIssue } from 'zod'
import { TErrorSecure, TGenericErrorResponse } from '../interface/error'

const handleZodError = (err: ZodError): TGenericErrorResponse => {

    const details = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }
    })

    const error: TErrorSecure = {
        details : details[0]
    }
    const statusCode = 400
    return {
        statusCode,
        message: 'Validation Error',
        error,
    }
}

export default handleZodError
