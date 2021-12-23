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

export const fetchCartItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CART_REQUEST:
      return { loadingFetchCart: true }
    case FETCH_CART_SUCCESS:
      return { loadingFetchCart: false, cart: action.payload }
    case FETCH_CART_FAIL:
      return { loadingFetchCart: false, fetchCartError: action.payload }
    default:
      return state
  }
}

export const removeCartItemReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_ITEM_REQUEST:
      return { loadingRemoveCartItem: true }
    case REMOVE_ITEM_SUCCESS:
      return { loadingRemoveCartItem: false, removeCartItemSuccess: action.payload }
    case REMOVE_ITEM_FAIL:
      return { loadingRemoveCartItem: false, removeCartItemError: action.payload }
    default:
      return state
  }
}