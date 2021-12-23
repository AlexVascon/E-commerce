import {
  CART_ADD_PRODUCT_REQUEST,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL
} from '../constants/cartConstants'

export const addItemToCartReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT_REQUEST:
      return { addItemToCartLoading: true }
    case CART_ADD_PRODUCT_SUCCESS:
      return { addItemToCartLoading: false, addItemToCartSuccess: action.payload }
    case CART_ADD_PRODUCT_FAIL:
      return { addItemToCartLoading: false, addItemToCartError: action.payload }
    default:
      return state
  }
}