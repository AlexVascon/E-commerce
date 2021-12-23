import instance from '../service/api'
import {
  CART_ADD_PRODUCT_REQUEST,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL
} from '../constants/cartConstants'

export const addItemToCart = (productId) => async (dispatch) => {
  try {
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