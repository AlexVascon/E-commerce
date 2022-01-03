import Product from '../models/productModel.js'
import Review from '../models/reviewModel.js'

export const createProduct = async (req, res, next) => {
  try {
    const product = await new Product({
      title: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      selection: req.body.selection,
      category: req.body.category,
      description: req.body.description,
      image: req.body.imageURL,
    })
    await product.save()
    res.status(201).send(product)
  } catch (err) {
    next(err)
  }
}

// requires a query
// example request: BASE_URL/products/category?selection=women&category=shirt&page=1&limit=7
export const fetchProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    const allProducts = await Product.find({
      selection: req.query.selection,
      category: req.query.category,
    }).lean()
    if (endIndex < allProducts.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      }
    }
    const products = await Product.find({
      selection: req.query.selection,
      category: req.query.category,
    })
      .limit(limit)
      .skip(startIndex)
      .exec()
    const pageCount = Math.ceil(allProducts.length / limit)
    res.status(200).send({ products, pageCount, page })
  } catch (err) {
    next(err)
  }
}

export const fetchProductDetails = async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findOne({ _id: productId }).lean().orFail()
    res.status(200).send(product)
  } catch (err) {
    next(err)
  }
}

// similar products based on current viewed product in browser
export const fetchSimilarProducts = async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId).lean()
    const products = await Product.find({
      selection: product.selection,
      category: product.category,
      _id: { $ne: productId },
    })
      .lean()
      .limit(5)
    res.status(200).send(products)
  } catch (err) {
    next(err)
  }
}

// requires a query
// example request: BASE_URL/products/all?page=1&limit=10
export const fetchAllProducts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    const allProducts = await Product.find({}).lean()
    if (endIndex < allProducts.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      }
    }
    const pageCount = Math.ceil(allProducts.length / limit)
    const products = await Product.find({}).limit(limit).skip(startIndex).exec()
    res.status(200).send({ products, pageCount, page })
  } catch (err) {
    next(err)
  }
}

export const editProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.body.productId)
    product.title = req.body.name || product.title
    product.price = req.body.price || product.price
    product.category = req.body.category || product.category
    product.description = req.body.description || product.description
    product.image = req.body.image || product.image
    product.selection = req.body.selection || product.selection
    product.quantity = req.body.quantity || product.quantity
    await product.save()
    res.status(201).send({ message: 'update successful' })
  } catch (err) {
    next(err)
  }
}

export const createProductReview = async (req, res, next) => {
  try {
    const { productId, rating, description } = req.body
    const review = await new Review({
      productId: productId,
      rating: rating,
      description: description,
      userId: req.user._id,
    })
    await review.save()
    const product = await Product.findById(productId)
    product.reviews.push(review._id)
    await product.calculateNewRatingAverage(review.rating)
    await product.save()
    res.status(201).send({ message: 'created new review' })
  } catch (err) {
    next(err)
  }
}

// requires a query
// example request: BASE_URL/products/reviews?&productId=1234567890&page=1&limit=8
export const fetchAllReviews = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    const allReviews = await Review.find({
      productId: req.query.productId,
    }).lean()
    if (endIndex < allReviews.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      }
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      }
    }
    const reviews = await Review.find({ productId: req.query.productId })
      .limit(limit)
      .skip(startIndex)
      .exec()
    const pageCount = allReviews.length / limit
    res.status(200).send({ reviews, pageCount, page })
  } catch (err) {
    next(err)
  }
}

export const fetchTopProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3).lean()
    res.status(200).send(products)
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    await product.remove()
    res.status(200).send({ message: 'product removed' })
  } catch (err) {
    next(err)
  }
}
