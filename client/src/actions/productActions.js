import instance from '../service/api'
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
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  SIMILAR_PRODUCT_REQUEST,
  SIMILAR_PRODUCT_SUCCESS,
  SIMILAR_PRODUCT_FAIL,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
} from '../constants/productConstants'

export const fetchProducts =
  (selection, category, page) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCTS_REQUEST })
      const { data } = await instance.get(
        `/product/category?selection=${selection}&category=${category}&page=${
          page + 1
        }&limit=5`
      )
      localStorage.setItem(
        'selectionPage',
        JSON.stringify({
          selectionType: selection,
          categoryType: category,
          page: page,
        })
      )
      dispatch({ type: PRODUCTS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCTS_FAIL,
        payload:
          error.response && error.response.data.messages
            ? error.response.data.messages
            : error.message,
      })
    }
  }

export const fetchAllProducts = (page) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCTS_REQUEST })
    localStorage.setItem('productListPage', page)
    const { data } = await instance.get(
      `/product/all?page=${page + 1}&limit=10`
    )
    dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const fetchProductInformation = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_INFORMATION_REQUEST })
    const { data } = await instance.get(`/product/information/${productId}`)
    dispatch({ type: PRODUCT_INFORMATION_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_INFORMATION_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const fetchProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_REVIEWS_REQUEST })
    const { data } = await instance.get(
      `/product/reviews?productId=${productId}&page=1&limit=5`
    )
    dispatch({ type: PRODUCT_REVIEWS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const createProductReview = (review) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REVIEW_REQUEST })
    const body = {
      productId: review.productId,
      rating: review.rating,
      description: review?.description || '',
    }
    const { data } = await instance.post('/product/create/review', body)
    dispatch({ type: CREATE_PRODUCT_REVIEW_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const fetchSimilarProducts = (productId) => async (dispatch) => {
  try {
    dispatch({ type: SIMILAR_PRODUCT_REQUEST })
    const { data } = await instance.get(`/product/suggestions/${productId}`)
    dispatch({ type: SIMILAR_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SIMILAR_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const fetchTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_PRODUCTS_REQUEST })
    const { data } = await instance.get('/product/top')
    dispatch({ type: TOP_PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST })
    const { data } = await instance.post('/product/create', product)
    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST })
    const { data } = await instance.put('/product/edit', product)
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST })
    const { data } = await instance.delete(`/product/${productId}`)
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}
