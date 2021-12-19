import userRoutes from './userRoutes.js'
import productRoutes from './productRoutes.js'
import cartRoutes from './cartRoutes.js'

export default (app) => {
  app.use('/users', userRoutes)
  app.use('/products', productRoutes)
  app.use('/cart', cartRoutes)
}

