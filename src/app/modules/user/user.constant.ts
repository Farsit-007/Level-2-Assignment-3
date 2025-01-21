import { TRole } from './user.interface'
export const Role: TRole[] = ['admin', 'user']

export const USER_Role = {
    user: 'user',
    admin: 'admin',
} as const
type TUserRole = keyof typeof USER_Role
