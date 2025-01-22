import { z } from 'zod'

const blogValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' }),
        content: z.string({ required_error: 'content is required' }),
        isPublished: z.boolean().default(true),
    }),
})

const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({ required_error: 'Title is required' }).optional(),
        content: z.string({ required_error: 'content is required' }).optional(),
        isPublished: z.boolean().default(true).optional(),
    }),
})

export const blogValidation = {
    blogValidationSchema,
    updateBlogValidationSchema,
}
