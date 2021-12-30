import userRoutes from './userRoutes.js'
import productRoutes from './productRoutes.js'
import cartRoutes from './cartRoutes.js'
import orderRoutes from './orderRoutes.js'

export default (app) => {
  app.use('/user', userRoutes)
  app.use('/products', productRoutes)
  app.use('/cart', cartRoutes)
  app.use('/order', orderRoutes)
}

