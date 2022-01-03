import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

export default (app) => {
  app.use(cors())

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())
}
