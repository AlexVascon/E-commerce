import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      required: [true, 'Email cant be empty.'],
      unique: [true, 'That email address is taken.']
    },
    password: {
      type: String,
      required: [true, 'Password cant be empty.'],
    },
    username: {
      type: String,
      required: [true, 'username cant be empty.']
    }
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  const salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)
})

const User = model('User', userSchema)

export default User