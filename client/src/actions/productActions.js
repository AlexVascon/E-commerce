import instance from '../service/api'
import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  PRODUCT_INFORMATION_REQUEST,
  PRODUCT_INFORMATION_SUCCESS,
  PRODUCT_INFORMATION_FAIL,
  PRODUCT_REVIEWS_REQUEST,
  PRODUCT_REVIEWS_SUCCESS,
  PRODUCT_REVIEWS_FAIL,
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


export const fetchProducts = (selection, category, page) => async (dispatch) => {
  try {
    dispatch({type: PRODUCTS_REQUEST})
    const { data } = await instance.get(
      `/products/category?selection=${selection}&category=${category}&page=${page + 1}&limit=5`
    )
    localStorage.setItem('currentPage', JSON.stringify({category: category, page: page}) )
    dispatch({ type: PRODUCTS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const fetchProductInformation = (productId) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_INFORMATION_REQUEST})
    const { data } = await instance.get(
      `/products/information/${productId}`
    );
    dispatch({ type: PRODUCT_INFORMATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_INFORMATION_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const fetchProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({type: PRODUCT_REVIEWS_REQUEST})
    const { data } = await instance.get(`/products/reviews?productId=${productId}&page=1&limit=5`)
    dispatch({type: PRODUCT_REVIEWS_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEWS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const createProductReview = (review) => async (dispatch) => {
  try {
    dispatch({type: CREATE_PRODUCT_REVIEW_REQUEST})
  const body = {
    productId: review.productId,
    rating: review.rating,
    description: review?.description || ''
  }
  const { data } = await instance.post('/products/create/review', body)
  dispatch({type: CREATE_PRODUCT_REVIEW_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_REVIEW_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const fetchSimilarProducts = (productId) => async (dispatch) => {
  try {
    dispatch({type: SIMILAR_PRODUCT_REQUEST})
    const {data} = await instance.get(`/products/suggestions/${productId}`)
    dispatch({type: SIMILAR_PRODUCT_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: SIMILAR_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const fetchTopProducts = () => async (dispatch) => {
  try {
    dispatch({type: TOP_PRODUCTS_REQUEST})
    const {data} = await instance.get('/products/top')
    dispatch({type: TOP_PRODUCTS_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}