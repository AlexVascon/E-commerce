import 'dotenv/config'
import './config/db.js'
import express from 'express'
const app = express()
import config from './config/index.js'
config(app)
import allRoutes from './routes/index.js'
allRoutes(app)
import dbMiddleware from './middleware/dbMiddleware.js'
app.use(dbMiddleware)

const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})