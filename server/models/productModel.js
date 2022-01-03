import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title cant be empty.'],
    },
    price: {
      type: Number,
      required: [true, 'price cant be empty.'],
    },
    category: {
      type: String,
      required: [true, 'category cant be empty.'],
    },
    description: {
      type: String,
      required: [true, 'description cant be empty.'],
    },
    image: {
      type: String,
      required: [true, 'image cant be empty.'],
    },
    selection: {
      type: String,
      required: [true, 'selection cant be empty.'],
    },
    quantity: {
      type: Number,
      default: 0,
    },
    reviews: [String],
    rating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

productSchema.methods.calculateNewRatingAverage = async function (newRating) {
  if (this.rating === 0 && this.reviews.length === 0)
    return this.rating * this.reviews.length
  const oldAverage = this.rating
  const newAverage = oldAverage + (newRating - oldAverage) / this.reviews.length
  this.rating = newAverage
}

const Product = mongoose.model('Product', productSchema)

export default Product
