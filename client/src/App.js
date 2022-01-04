import React from 'react'
import { GlobalStyles } from './GlobalStyles'
import { Routes, Route } from 'react-router-dom'
import { AppContainer } from './AppContainer'
import AnonRoute from './components/AnonRoute'
import Home from './views/Home'
import Navbar from './components/Navbar'
import Portal from './views/Portal'
import Selection from './views/Selection'
import Shipping from './views/Shipping'
import Account from './views/Account'
import Cart from './views/Cart'
import Product from './views/Product'
import Pay from './views/Pay'
import Checkout from './views/Checkout'
import PrivateRoute from './components/PrivateRoute'
import MyOrders from './views/MyOrders'
import OrderDetails from './views/OrderDetails'
import UserEdit from './views/AccountEdit'
import ProductCreate from './views/ProductCreate'
import ProductUpdate from './views/ProductUpdate'
import ProductList from './views/ProductList'
import AdminRoute from './components/AdminRoute'
import OrderList from './views/OrderList'
import AccountList from './views/AccountList'
import About from './views/About'
import Footer from './components/Footer'

export default function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route element={<AnonRoute />}>
          <Route path='/portal' element={<Portal />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/account' element={<Account />} />
          <Route path='/user/edit' element={<UserEdit />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order/pay/:orderId' element={<Pay />} />
          <Route path='/my-orders' element={<MyOrders />} />
          <Route path='/order/:orderId' element={<OrderDetails />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path='/admin/product/all' element={<ProductList />} />
          <Route path='/admin/order/all' element={<OrderList />} />
          <Route path='/admin/user/all' element={<AccountList />} />
          <Route path='/admin/product/create' element={<ProductCreate />} />
          <Route
            path='/admin/product/update/:productId'
            element={<ProductUpdate />}
          />
        </Route>
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/selection/:gender' element={<Selection />} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<Home />} />
      </Routes>
      <Footer />
    </AppContainer>
  )
}
