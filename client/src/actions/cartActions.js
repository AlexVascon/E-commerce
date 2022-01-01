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
  REMOVE_ITEM_FAIL,
  ANONYMOUS_CART_ADD_PRODUCT_REQUEST,
  ANONYMOUS_ADD_PRODUCT_SUCCESS,
  ANONYMOUS_ADD_PRODUCT_FAIL
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
          : error.message,
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
          : error.message,
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
          : error.message,
    })
  }
}

export const addCartItemToAnonymous = (itemId) => async (dispatch) => {
    dispatch({type: ANONYMOUS_CART_ADD_PRODUCT_REQUEST})
    let anonymousCart = JSON.parse(localStorage.getItem('anonymousCart'))
    if(!anonymousCart) {
      anonymousCart = {cart: [{itemId: itemId, quantity: 1}]}
      localStorage.setItem('anonymousCart', JSON.stringify(anonymousCart))
    } else {
      const itemInCart = anonymousCart.cart.filter(item => item.itemId === itemId)
      if(itemInCart.length) {
        const updatedItemQuantity = anonymousCart.cart.map(item => {
          if(item.itemId === itemId) item.quantity ++
          return item
        })
        anonymousCart.cart = updatedItemQuantity
      } else {
        anonymousCart.cart.push({itemId: itemId, quantity: 1})
      }
      localStorage.setItem('anonymousCart', JSON.stringify(anonymousCart))
    }
}