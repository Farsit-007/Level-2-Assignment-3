import { z } from 'zod'
import { Role } from './user.constant'

const userValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().max(20),
        role: z.enum([...Role] as [string, ...string[]]).default('user'),
        isBlock: z.boolean().default(false),
    }),
})

export const UserValidation = {
    userValidationSchema,
}
