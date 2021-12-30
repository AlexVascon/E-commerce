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

export default function App() {
  return (
    <AppContainer>
    <GlobalStyles />
    <Navbar />
      <Routes>
        <Route element={<AnonRoute />} >
          <Route path='/portal' element={<Portal />} />
        </Route>
        <Route element={<PrivateRoute />} >
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order/pay/:orderId' element={<Pay />} />
          <Route path='/my-orders' element={<MyOrders />} />
        </Route>
        <Route path='/selection/:gender' element={<Selection />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/order/details' element={<OrderDetails />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </AppContainer>
  )
}


