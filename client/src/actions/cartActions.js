import instance from '../service/api'
import {
  CART_ADD_PRODUCT_REQUEST,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAIL,
  REMOVE_ITEM_REQUEST,
  REMOVE_ITEM_SUCCESS,
  REMOVE_ITEM_FAIL
} from '../constants/cartConstants'

export const addItemToCart = (productId) => async (dispatch) => {
  try {
    console.log('here???')
    dispatch({type: CART_ADD_PRODUCT_REQUEST})
    const body = { productId }
    const { data } = await instance.post('/cart/add', body)
    dispatch({ type: CART_ADD_PRODUCT_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CART_ADD_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const fetchCartItems = () => async (dispatch) => {
  try {
    dispatch({type: FETCH_CART_REQUEST})
    const { data } = await instance.get('cart/all')
    dispatch({ type: FETCH_CART_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_CART_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const removeFromCart = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVE_ITEM_REQUEST })
    const { data } = await instance.get(`/cart/remove/${itemId}`)
    dispatch({ type: REMOVE_ITEM_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: REMOVE_ITEM_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};