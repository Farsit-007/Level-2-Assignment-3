export type TErrorSecure = {
    details: {
        path: string | number
        message: string
    }
}

export type TGenericErrorResponse = {
    statusCode: number
    message: string
    error: TErrorSecure
}
