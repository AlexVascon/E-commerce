import instance from '../service/api'
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

export const createOrder = () => async (dispatch) => {
  try {
    dispatch({type: CREATE_ORDER_REQUEST})
  const {data} = await instance.post('/order/create')
  dispatch({type: CREATE_ORDER_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error.response 
      && error.response.data.messages 
      ? error.response.data.messages 
      : error.messages,
  })
  }
}

export const fetchOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({type: FETCH_ORDER_REQUEST})
  const {data} = await instance.get(`/order/${orderId}`)
  dispatch({type: FETCH_ORDER_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: FETCH_ORDER_FAIL,
      payload: error.response 
      && error.response.data.messages 
      ? error.response.data.messages 
      : error.messages,
  })
  }
}

export const payOrder = (error,orderId, paymentMethod) => async (dispatch) => {
  try {
    dispatch({type: PAY_ORDER_REQUEST})
    if(error) return dispatch({type: PAY_ORDER_FAIL, payload: error})
    const {id} = paymentMethod
    const body = {orderId, id}
  const {data} = await instance.post('/order/pay', body)
  dispatch({type: PAY_ORDER_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: PAY_ORDER_FAIL,
      payload: error.response 
      && error.response.data.messages 
      ? error.response.data.messages 
      : error.messages,
  })
  }
}

export const fetchMyOrders = () => async (dispatch) => {
  try {
    dispatch({type: FETCH_MY_ORDERS_REQUEST})
    const {data} = await instance.get('/order/my-orders')
    dispatch({type: FETCH_MY_ORDERS_SUCCESS, payload: data})
  } catch (error) {
    dispatch({
      type: FETCH_MY_ORDERS_FAIL,
      payload: error.response 
      && error.response.data.messages 
      ? error.response.data.messages 
      : error.messages,
  })
  }
}

