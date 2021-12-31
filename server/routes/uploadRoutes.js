import express from 'express'
const router = express.Router()
import fileUploader from '../config/cloudinary.js'

router.post('/product', fileUploader.single('image'), async (req,res,next) => {
  try {
    if (!req.file) return next(new Error('No file uploaded!'))
    res.status(200).send({ cloud_url: req.file.path })
  } catch (err) {
    next(err)
  }
})

export default router
