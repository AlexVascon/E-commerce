import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchCartItems, addItemToCart, removeFromCart } from '../actions/cartActions'
import { fetchShippingInformation } from '../actions/userActions'
import { View } from '../components/View'
import styled from 'styled-components'
import CartItem from '../components/CartItem'
import { Button } from '../components/Button'
import {useNavigate} from 'react-router-dom'

export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cart} = useSelector((state) => state.fetchCartItems)
  const {addItemToCartSuccess} = useSelector((state) => state.addItemToCart)
  const {removeCartItemSuccess} = useSelector((state) => state.removeCartItem)
  const {shippingInformation} = useSelector((state) => state.fetchShippingInformation)

  useEffect(() => {
    dispatch(fetchCartItems())
    dispatch(fetchShippingInformation())
  }, [dispatch, addItemToCartSuccess, removeCartItemSuccess])

  return (
    <View>
      <Title>SHOPPING CART</Title>
      <CartItem.List>
      {cart && cart.items.map(item => {
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
            <CartItem.Button onClick={() => dispatch(addItemToCart(item.itemId))}>+</CartItem.Button>
            <CartItem.Quantity>{item && item.quantity}</CartItem.Quantity>
            <CartItem.Button onClick={() => dispatch(removeFromCart(item.itemId))}>-</CartItem.Button>
          </CartItem.EditContainer>
        </CartItem.Item>
        )
      })
      }
      </CartItem.List>
      <CartItem.CostList>
        <CartItem.CostRow>
          <CartItem.RowText>Total</CartItem.RowText>
          <CartItem.RowText>${cart && cart.totalCost}</CartItem.RowText>
        </CartItem.CostRow>
        <CartItem.CostRow>
          <CartItem.RowText>Taxes</CartItem.RowText>
          <CartItem.RowText>$40</CartItem.RowText>
        </CartItem.CostRow>
        <CartItem.CostRow>
          <CartItem.RowText>Delivery</CartItem.RowText>
          <CartItem.RowText onClick={() => navigate('/shipping')}>Edit shipping</CartItem.RowText>
        </CartItem.CostRow>
        {(!cart?.items?.length || !shippingInformation) ?
          <Button disabled>CHECKOUT</Button>
          :
          <Button onClick={() => navigate('/checkout')}>CHECKOUT</Button>
         }
      </CartItem.CostList>
    </View>
  );
}

const Title = styled.h1`
  width: 100%;
  text-align: left;
  padding-left: 1.5rem;
  font-weight: 700;
  color: rgba(235, 198, 36, 0.945);
  font-size: 1rem;
`
