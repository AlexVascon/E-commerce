import userRoutes from './userRoutes.js'
import productRoutes from './productRoutes.js'

export default (app) => {
  app.use('/users', userRoutes)
  app.use('/products', productRoutes)
}

