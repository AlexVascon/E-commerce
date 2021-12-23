import instance from '../service/api'
import {
  REGISTRATION_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL
} from '../constants/userConstants'

export const register = (username, email, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch({type: REGISTRATION_REQUEST})
    const body = { username, email, password , confirmPassword}
    const { data } = await instance.post('/user/register',body)
    localStorage.setItem('accessToken', data)
    const validationToken = await instance.get('/user/verify')
    dispatch({ type: REGISTER_SUCCESS, payload: validationToken })
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const authenticate = () => async (dispatch) => {
  try {
    dispatch({type: AUTHENTICATION_REQUEST})
    const validationToken = await instance.get('/user/verify')
    if (!validationToken) dispatch({ type: AUTHENTICATION_FAIL, payload: false })
    else dispatch({ type: AUTHENTICATION_SUCCESS, payload: true })
  } catch (error) {
    dispatch({
      type: AUTHENTICATION_FAIL,
      payload: false
    })
  }
};