import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  fetchProductsReducer,
  fetchProductInformationReducer,
  fetchProductReviewsReducer,
  createProductReviewReducer,
  fetchSimilarProductsReducer,
  fetchTopProductsReducer,
  createProductReducer,
  updateProductReducer,
  fetchAllProductsReducer,
  deleteProductReducer,
} from './reducers/productReducer'
import {
  registerReducer,
  authenticationReducer,
  saveShippingInformationReducer,
  fetchShippingInformationReducer,
  loginReducer,
  logoutReducer,
  editUserReducer,
  fetchAllUsersReducer,
  deleteUserReducer
} from './reducers/userReducer'
import {
  addCartItemToAnonymousReducer,
  addItemToCartReducer,
  fetchCartItemsReducer,
  removeCartItemReducer,
} from './reducers/cartReducer'
import {
  createOrderReducer,
  fetchAllOrdersReducer,
  fetchMyOrdersReducer,
  fetchOrderReducer,
  markOrderDeliveredReducer,
  payOrderReducer,
} from './reducers/orderReducer'

const reducer = combineReducers({
  fetchProducts: fetchProductsReducer,
  fetchAllProducts: fetchAllProductsReducer,
  fetchProductInformation: fetchProductInformationReducer,
  register: registerReducer,
  login: loginReducer,
  logout: logoutReducer,
  authenticate: authenticationReducer,
  editUser: editUserReducer,
  deleteUser: deleteUserReducer,
  fetchAllUsers: fetchAllUsersReducer,
  saveShippingInformation: saveShippingInformationReducer,
  fetchShippingInformation: fetchShippingInformationReducer,
  fetchProductReviews: fetchProductReviewsReducer,
  createProductReview: createProductReviewReducer,
  fetchSimilarProducts: fetchSimilarProductsReducer,
  fetchTopProducts: fetchTopProductsReducer,
  createProduct: createProductReducer,
  deleteProduct: deleteProductReducer,
  updateProduct: updateProductReducer,
  addCartItemToAnonymous: addCartItemToAnonymousReducer,
  addItemToCart: addItemToCartReducer,
  fetchCartItems: fetchCartItemsReducer,
  removeCartItem: removeCartItemReducer,
  createOrder: createOrderReducer,
  fetchOrder: fetchOrderReducer,
  fetchAllOrders: fetchAllOrdersReducer,
  payOrder: payOrderReducer,
  markOrderDelivered: markOrderDeliveredReducer,
  fetchMyOrders: fetchMyOrdersReducer,
})
const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
