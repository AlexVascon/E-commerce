import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true 
    },
    category: {
      type: String,
      required: true 
    },
    description: {
      type: String,
      required: true 
    },
    image: {
      type: String,
      required: true 
    },
    selection: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
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

productSchema.methods.calculateRatingAverage = async function(newRating) {
  if(this.rating === 0 && this.reviews.length === 0) return this.rating * this.reviews.length
  const oldAverage = this.rating 
  const newAverage = oldAverage + ((newRating - oldAverage) / this.reviews.length )
  this.rating = newAverage
}

const Product = mongoose.model('Product', productSchema)

export default Product
