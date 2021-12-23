import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchProductsReducer, fetchProductInformationReducer, fetchProductReviewsReducer, createProductReviewReducer } from './reducers/productReducer'
import { registerReducer, authenticationReducer, saveShippingInformationReducer, fetchShippingInformationReducer, loginReducer } from './reducers/userReducer'
import { addItemToCartReducer } from './reducers/cartReducer'

const reducer = combineReducers({
  fetchProducts: fetchProductsReducer,
  fetchProductInformation: fetchProductInformationReducer,
  register: registerReducer,
  login: loginReducer,
  authenticate: authenticationReducer,
  saveShippingInformation: saveShippingInformationReducer,
  fetchShippingInformation: fetchShippingInformationReducer,
  fetchProductReviews: fetchProductReviewsReducer,
  createProductReview: createProductReviewReducer,
  addItemToCart: addItemToCartReducer,
})
const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store