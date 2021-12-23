import mongoose from 'mongoose'

const shippingSchema = new mongoose.Schema({
  userId: {
   type: String,
   required: true       
  },
  information: {
    fullName: {type: String, required: [true, 'fullName is required.']},
    phoneNumber: {type: String, required: [true, 'phone number is required.']},
    email: {type: String, required: [true, 'email is required.']},
    country: {type: String, required: [true, 'country is required.']},
    city: {type: String, required: [true, 'city is required.']},
    province: {type: String, required: [true, 'province is required.']},
    postCode: {type: String, required: [true, 'post code is required.']},
    streetAddress: {type: String, required: [true, 'street address is required.']},
},
})

const Shipping = mongoose.model('Shipping', shippingSchema)
export default Shipping