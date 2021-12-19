import Product from '../models/productModel.js'

export const createProduct = async (req,res,next) => {
  try {
    const {title, imageURL, description, price, quantity, selection, category} = req.body
    const newProduct = await new Product({
      title: title, 
      image: imageURL, 
      description: description,
      price: price,
      quantity: quantity, 
      selection: selection, 
      category: category
    })
    await newProduct.save()
    res.status(201).send({message: 'added succefully '})
  } catch (err) {
    next(err)
  }
}

export const deleteProduct = async (req,res,next) => {
  try {
    await Product.findByIdAndDelete(req.params._id)
    res.status(200).send({message: 'deleted'})
  } catch (err) {
    next(err)
  }
}

// requires a query
// example request: BASE_URL/products/category?selection=women&category=shirt&page=1&limit=7
export const fetchProducts = async (req,res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit)
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    const allProducts = await Product.find({selection: req.query.selection, category: req.query.category}).lean()
    if(endIndex < allProducts.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if(startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    const products = await Product.find({selection: req.query.selection, category: req.query.category}).limit(limit).skip(startIndex).exec()
    res.status(200).send({products: products, count: allProducts.length, page: page })
  } catch (err) {
    next(err)
  }
}

export const fetchProductDetails = async (req,res, next) => {
  try {
    const {productId} = req.params
    const product = await Product.findOne({_id: productId}).lean().orFail()
    res.status(200).send(product)
  } catch (err) {
    next(err)
  }
}

// similar products based on current viewed product in browser
export const fetchProductSuggestions = async (req,res, next) => {
  try {
    const {productId} = req.params
    const product = await Product.findById(productId).lean()
    const products = await Product.find({selection: product.selection, category: product.category, _id: {$ne: productId}}).lean().limit(5)
    res.status(200).send(products)
  } catch (err) {
    next(err)
  }
}

export const fetchAllProducts = async (req,res,next) => {
  try {
    const products = await Product.find().lean()
    res.status(200).send(products)
  } catch (err) {
    next(err)
  }
}

export const editProduct = async (req,res,next) => {
  try {
    const product = await Product.findById(req.body.productId)
    product.title = req.body.title || product.title
    product.price = Number(req.body.price) || product.price
    product.category = req.body.category || product.category
    product.description = req.body.description || product.description
    product.image = req.body.image || product.image
    product.selection = req.body.selection || product.selection
    product.quantity = req.body.quantity || product.quantity
    await product.save()
    res.status(200).send({message: 'update successful'})
  } catch (err) {
    next(err)
  }
}