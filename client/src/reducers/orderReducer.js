import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PAY_ORDER_FAIL,
  FETCH_MY_ORDERS_REQUEST,
  FETCH_MY_ORDERS_SUCCESS,
  FETCH_MY_ORDERS_FAIL
} from '../constants/orderConstants'

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { createOrderLoading: true }
    case CREATE_ORDER_SUCCESS:
      return { createOrderLoading: false, order: action.payload }
    case CREATE_ORDER_FAIL:
      return { createOrderLoading: false, createOrderError: action.payload }
    default:
      return state
  }
}

export const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case PAY_ORDER_REQUEST:
      return { payOrderLoading: true }
    case PAY_ORDER_SUCCESS:
      return { payOrderLoading: false, payOrderSuccess: action.payload }
    case PAY_ORDER_FAIL:
      return { payOrderLoading: false, payOrderError: action.payload }
    default:
      return state
  }
}

export const fetchOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return { fetchOrderLoading: true }
    case FETCH_ORDER_SUCCESS:
      return { fetchOrderLoading: false, foundOrder: action.payload }
    case FETCH_ORDER_FAIL:
      return { fetchOrderLoading: false, fetchOrderError: action.payload }
    default:
      return state
  }
}

export const fetchMyOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MY_ORDERS_REQUEST:
      return { fetchMyOrdersLoading: true }
    case FETCH_MY_ORDERS_SUCCESS:
      return { fetchMyOrdersLoading: false, myOrders: action.payload }
    case FETCH_MY_ORDERS_FAIL:
      return { fetchMyOrdersLoading: false, fetchMyOrdersError: action.payload }
    default:
      return state
  }
}