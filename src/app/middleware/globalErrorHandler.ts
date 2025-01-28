/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { ZodError, ZodIssue } from 'zod'
import { TErrorSecure } from '../interface/error'
import config from '../config'
import handleZodError from '../Errors/handleZodError'
import handleValidationError from '../Errors/handleValidationError'
import handleCastError from '../Errors/handleCastError'
import handleDuplicateError from '../Errors/handleDuplicateError'
import AppError from '../Errors/AppError'
export const globalErrorHandler: ErrorRequestHandler = (
    err,
    req,
    res,
    next
) => {
    let statusCode = 500
    let message = 'Something went wrong!!'
    const details = {
        path: '',
        message: 'Something went wrong',
    }
    let error: TErrorSecure = {
        details,
    }

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        error = simplifiedError?.error
    } else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        error = simplifiedError?.error
    } else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        error = simplifiedError?.error
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        error = simplifiedError?.error
    } else if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
        error = {
            details: {
                path: '',
                message: err?.message,
            },
        }
    } else if (err instanceof Error) {
        message = err.message
        error = {
            details: {
                path: '',
                message: err?.message,
            },
        }
    }

    res.status(statusCode).json({
        success: false,
        message,
        error,
        stack: err?.stack || null,
    })
}
