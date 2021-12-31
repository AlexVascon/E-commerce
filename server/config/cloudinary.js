import cloudinary from 'cloudinary'
const {v2} = cloudinary
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: v2,
  params: {
    allowed_formats: ['jpg', 'png'],
    folder: 'shop' // The name of the folder in cloudinary
  }
})

export default multer({ storage })
