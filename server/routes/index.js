import userRoutes from './userRoutes.js'
import productRoutes from './productRoutes.js'
import cartRoutes from './cartRoutes.js'
import orderRoutes from './orderRoutes.js'
import uploadRoutes from './uploadRoutes.js'

export default (app) => {
  app.use('/user', userRoutes)
  app.use('/product', productRoutes)
  app.use('/cart', cartRoutes)
  app.use('/order', orderRoutes)
  app.use('/upload', uploadRoutes)
}

