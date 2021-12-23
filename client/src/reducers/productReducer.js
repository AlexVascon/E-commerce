
import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  PRODUCT_INFORMATION_REQUEST,
  PRODUCT_INFORMATION_SUCCESS,
  PRODUCT_INFORMATION_FAIL
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
