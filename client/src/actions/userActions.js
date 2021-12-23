import instance from '../service/api'
import {
  REGISTRATION_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
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
    });
  }
};