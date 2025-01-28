import { TErrorSecure, TGenericErrorResponse } from '../interface/error'

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const match = err.message.match(/"([^"]*)"/)
    const extractedMessage = match && match[1]
    const details = {
        path: '',
        message: `${extractedMessage} is already exists`,
    }
    const error: TErrorSecure = {
        details,
    }
    const statusCode = 400
    return {
        statusCode,
        message: 'Invalid Id',
        error,
    }
}

export default handleDuplicateError
