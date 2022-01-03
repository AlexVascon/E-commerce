import 'dotenv/config'
import './config/db.js'
import path from 'path'
import express from 'express'
const app = express()
import config from './config/index.js'
config(app)
import allRoutes from './routes/index.js'
allRoutes(app)
import dbMiddleware from './middleware/dbMiddleware.js'

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
}

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.use(dbMiddleware)

const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
