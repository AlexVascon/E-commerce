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

// example request: url/category?selection=women&category=shirt&page=1&limit=7
export const category = async (req,res, next) => {
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
    const categoryItems = await Product.find({selection: req.query.selection, category: req.query.category}).limit(limit).skip(startIndex).exec()
    res.status(200).send({items: categoryItems, count: allProducts.length, page: page })
  } catch (err) {
    next(err)
  }
}