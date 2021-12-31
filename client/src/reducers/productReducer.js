
import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_INFORMATION_REQUEST,
  PRODUCT_INFORMATION_SUCCESS,
  PRODUCT_INFORMATION_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_REVIEWS_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  SIMILAR_PRODUCT_REQUEST,
  SIMILAR_PRODUCT_SUCCESS,
  SIMILAR_PRODUCT_FAIL,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL
} from '../constants/productConstants'

export const fetchProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST:
      return { fetchProductsLoading: true }
    case PRODUCTS_SUCCESS:
      return { fetchProductsLoading: false, foundProducts: action.payload }
    case PRODUCTS_FAIL:
      return { fetchProductsLoading: false, fetchProductsError: action.payload }
    default:
      return state
  }
}

export const fetchAllProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_PRODUCTS_REQUEST:
      return { fetchAllProductsLoading: true }
    case ALL_PRODUCTS_SUCCESS:
      return { fetchAllProductsLoading: false, foundProducts: action.payload }
    case ALL_PRODUCTS_FAIL:
      return { fetchAllProductsLoading: false, fetchAllProductsError: action.payload }
    default:
      return state
  }
}

export const fetchProductInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_INFORMATION_REQUEST:
      return { fetchProductInformationLoading: true }
    case PRODUCT_INFORMATION_SUCCESS:
      return { fetchProductInformationLoading: false, foundProductInformation: action.payload }
    case PRODUCT_INFORMATION_FAIL:
      return { fetchProductInformationLoading: false, fetchProductInformationError: action.payload }
    default:
      return state
  }
}

export const fetchProductReviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEWS_REQUEST:
      return { loadingProductReviews: true }
    case PRODUCT_REVIEWS_SUCCESS:
      return { loadingProductReviews: false, reviews: action.payload }
    case PRODUCT_REVIEWS_FAIL:
      return { loadingProductReviews: false, fetchProductReviewsError: action.payload }
    default:
      return state
  }
}

export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { loadingCreateProductReview: true }
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return { loadingCreateProductReview: false, reviewSuccess: action.payload }
    case CREATE_PRODUCT_REVIEW_FAIL:
      return { loadingCreateProductReview: false, createProductReviewError: action.payload }
    default:
      return state
  }
}

export const fetchSimilarProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case SIMILAR_PRODUCT_REQUEST:
      return { loadingFetchSimilarProducts: true }
    case SIMILAR_PRODUCT_SUCCESS:
      return { loadingFetchSimilarProducts: false, similarProducts: action.payload }
    case SIMILAR_PRODUCT_FAIL:
      return { loadingFetchSimilarProducts: false, fetchSimilarProductsError: action.payload }
    default:
      return state
  }
}

export const fetchTopProductsReducer = (state = {}, action) => {
  switch (action.type) {
    case TOP_PRODUCTS_REQUEST:
      return { loadingFetchTopProducts: true }
    case TOP_PRODUCTS_SUCCESS:
      return { loadingFetchTopProducts: false, topProducts: action.payload }
    case TOP_PRODUCTS_FAIL:
      return { loadingFetchTopProducts: false, fetchTopProductsError: action.payload }
    default:
      return state
  }
}

export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return { loadingCreateProduct: true }
    case CREATE_PRODUCT_SUCCESS:
      return { loadingCreateProduct: false, product: action.payload }
    case CREATE_PRODUCT_FAIL:
      return { loadingCreateProduct: false, createProductError: action.payload }
    default:
      return state
  }
}

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return { loadingDeleteProduct: true }
    case DELETE_PRODUCT_SUCCESS:
      return { loadingDeleteProduct: false, product: action.payload }
    case DELETE_PRODUCT_FAIL:
      return { loadingDeleteProduct: false, deleteProductError: action.payload }
    default:
      return state
  }
}

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return { loadingUpdateProduct: true }
    case UPDATE_PRODUCT_SUCCESS:
      return { loadingUpdateProduct: false, product: action.payload }
    case UPDATE_PRODUCT_FAIL:
      return { loadingUpdateProduct: false, updateProductError: action.payload }
    default:
      return state
  }
}
