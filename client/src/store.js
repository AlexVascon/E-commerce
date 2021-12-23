import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchProductsReducer, fetchProductInformationReducer } from './reducers/productReducer'
import { registerReducer, authenticationReducer, saveShippingInformationReducer, fetchShippingInformationReducer } from './reducers/userReducer'

const reducer = combineReducers({
  fetchProducts: fetchProductsReducer,
  fetchProductInformation: fetchProductInformationReducer,
  register: registerReducer,
  authenticate: authenticationReducer,
  saveShippingInformation: saveShippingInformationReducer,
  fetchShippingInformation: fetchShippingInformationReducer
})
const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store