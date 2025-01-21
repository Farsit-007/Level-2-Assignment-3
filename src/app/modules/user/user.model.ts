/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose'
import { TUser, UserModel } from './user.interface'
import { Role } from './user.constant'
import bcrypt from 'bcrypt'
import config from '../../config'
const userSchema = new Schema<TUser, UserModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: Role,
            required: true,
            default: 'user',
        },
        isBlock: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

userSchema.pre('save', async function (next) {
    const user = this
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt))
    next()
})

userSchema.post('save', function (doc, next) {
    doc.password = ' '
    next()
})

userSchema.statics.isUserExists = async function (email: string) {
    const user = await User.findOne({ email })
    return user
}

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword: string,
    hashedPassword: string
) {
    console.log(plainTextPassword, hashedPassword)
    return await bcrypt.compare(plainTextPassword, hashedPassword)
}

export const User = model<TUser, UserModel>('User', userSchema)
