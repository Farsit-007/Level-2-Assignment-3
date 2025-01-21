/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'
import { USER_Role } from './user.constant'

export type TRole = 'admin' | 'user'
export interface TUser {
    name: string
    email: string
    password: string
    role: TRole
    isBlock: boolean
}

export interface UserModel extends Model<TUser> {
    isUserExists(email: string): Promise<TUser | null>
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>
}


export type TUserRole = keyof typeof USER_Role