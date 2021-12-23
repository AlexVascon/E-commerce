import instance from '../service/api'
import {
  PRODUCTS_REQUEST,
  PRODUCTS_SUCCESS,
  PRODUCTS_FAIL,
  PRODUCT_INFORMATION_REQUEST,
  PRODUCT_INFORMATION_SUCCESS,
  PRODUCT_INFORMATION_FAIL
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
    });
  }
};