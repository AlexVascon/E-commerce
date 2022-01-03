import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

export default (app) => {
  app.set('trust proxy', 1)

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || 'http://localhost:3000',
    })
  )

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
}
