import userRoutes from './userRoutes.js'

export default (app) => {
  app.use('/users', userRoutes)
}

