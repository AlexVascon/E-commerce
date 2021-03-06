import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
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
      required: [true, 'username cant be empty.'],
      unique: [true, 'That email address is taken.']
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
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

const User = mongoose.model('User', userSchema)

export default User