import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { fetchProductsReducer, fetchProductInformationReducer, fetchProductReviewsReducer, createProductReviewReducer, fetchSimilarProductsReducer } from './reducers/productReducer'
import { registerReducer, authenticationReducer, saveShippingInformationReducer, fetchShippingInformationReducer, loginReducer, logoutReducer } from './reducers/userReducer'
import { addItemToCartReducer, fetchCartItemsReducer, removeCartItemReducer } from './reducers/cartReducer'
import { createOrderReducer, fetchMyOrdersReducer, fetchOrderReducer, payOrderReducer } from './reducers/orderReducer'

const reducer = combineReducers({
  fetchProducts: fetchProductsReducer,
  fetchProductInformation: fetchProductInformationReducer,
  register: registerReducer,
  login: loginReducer,
  logout: logoutReducer,
  authenticate: authenticationReducer,
  saveShippingInformation: saveShippingInformationReducer,
  fetchShippingInformation: fetchShippingInformationReducer,
  fetchProductReviews: fetchProductReviewsReducer,
  createProductReview: createProductReviewReducer,
  fetchSimilarProducts: fetchSimilarProductsReducer,
  addItemToCart: addItemToCartReducer,
  fetchCartItems: fetchCartItemsReducer,
  removeCartItem: removeCartItemReducer,
  createOrder: createOrderReducer,
  fetchOrder: fetchOrderReducer,
  payOrder: payOrderReducer,
  fetchMyOrders: fetchMyOrdersReducer,
})
const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store