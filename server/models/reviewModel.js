import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
  productId: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'to submit review please provide a rating.']
  },
  description: {
    type: String
  },
  userId: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
)

const Review = mongoose.model('Review', reviewSchema)

export default Review