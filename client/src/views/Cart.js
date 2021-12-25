import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchCartItems, addItemToCart, removeFromCart } from '../actions/cartActions'
import { View } from '../components/View'
import styled from 'styled-components'
import CartItem from '../components/CartItem'
import { Button } from '../components/Button'
import {useNavigate} from 'react-router-dom'

export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cart} = useSelector((state) => state.fetchCartItems)
  const [cartItems, setCartItems] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  useEffect(() => {
    if(cart) {
      setCartItems(cart.items)
      setTotalPrice(cart.totalCost)
    } 
  }, [cart])

  // for smoother user experience without constant screen flash on update
  const updateItemQuantity = (amount, itemId,index) => {
    let updatedCartItems = [...cartItems]
    updatedCartItems[index].quantity += amount 
    if(amount > 0) {
      dispatch(addItemToCart(itemId))
      setTotalPrice(totalPrice => totalPrice += updatedCartItems[index].price)
    } 
    if(amount < 0) {
      dispatch(removeFromCart(itemId))
      setTotalPrice(totalPrice => totalPrice -= updatedCartItems[index].price)
    } 
    setCartItems(updatedCartItems)
  }

  return (
    <View>
      <Title>SHOPPING CART</Title>
      <CartItem.List>
      {cartItems && cartItems.map((item, index) => {
        return (
          <CartItem.Item key={item.itemId} >
          <CartItem.ImageContainer>
            <CartItem.Image src={item.image} />
          </CartItem.ImageContainer>
          <CartItem.DescriptionContainer>
            <CartItem.Title>{item.name}</CartItem.Title>
            <CartItem.Price>${item.price}</CartItem.Price>
          </CartItem.DescriptionContainer>
          <CartItem.EditContainer>
            <CartItem.Button onClick={() => updateItemQuantity(1,item.itemId, index)}>+</CartItem.Button>
            <CartItem.Quantity>{item && item.quantity}</CartItem.Quantity>
            <CartItem.Button onClick={() => updateItemQuantity(-1,item.itemId, index)}>-</CartItem.Button>
          </CartItem.EditContainer>
        </CartItem.Item>
        )
      })
      }
      </CartItem.List>
      <CartItem.CostList>
        <CartItem.CostRow>
          <CartItem.RowText>Total</CartItem.RowText>
          <CartItem.RowText>${totalPrice && totalPrice}</CartItem.RowText>
        </CartItem.CostRow>
        <CartItem.CostRow>
          <CartItem.RowText>Taxes</CartItem.RowText>
          <CartItem.RowText>${(cart && cart.taxPrice) || 0}</CartItem.RowText>
        </CartItem.CostRow>
        <CartItem.CostRow>
          <CartItem.RowText>Delivery</CartItem.RowText>
          <CartItem.RowText>Free</CartItem.RowText>
        </CartItem.CostRow>
        {(!cart?.items?.length) ?
          <Button disabled>CHECKOUT</Button>
          :
          <Button onClick={() => navigate('/checkout')}>CHECKOUT</Button>
         }
      </CartItem.CostList>
    </View>
  )
}

const Title = styled.h1`
  width: 100%;
  text-align: left;
  padding-left: 1.5rem;
  font-weight: 700;
  color: rgba(235, 198, 36, 0.945);
  font-size: 1rem;
`

