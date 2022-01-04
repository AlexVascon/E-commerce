import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

export default (app) => {
  app.set('trust proxy', 1)

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
}
