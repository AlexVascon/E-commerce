import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchCartItems } from '../actions/cartActions'
import { fetchShippingInformation } from '../actions/userActions'
import { createOrder  } from '../actions/orderActions'
import { View, Row, RowText } from '../components/View'
import { Button } from '../components/Button'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cart} = useSelector((state) => state.fetchCartItems)
  const {shippingInformation} = useSelector((state) => state.fetchShippingInformation)
  const {order} = useSelector((state) => state.createOrder)

  useEffect(() => {
    dispatch(fetchCartItems())
    dispatch(fetchShippingInformation())
  }, [dispatch])

  useEffect(() => {
    if(order) navigate(`/order/pay/${order._id}`)
  }, [order, navigate])

  return (
    <View>
      <OrderItems>
      {cart && cart.items.map(item => {
        return (
          <Item key={item.itemId}>
            <ImageContainer>
              <Image src={item.image} />
            </ImageContainer>
            <Title>{item.name}</Title>
            <Quantity>{item.quantity}</Quantity>
          </Item>
        )
      })}
      </OrderItems>
      <Row>
        <RowText>Total</RowText>
        <RowText>${cart && cart.totalCost}</RowText>
      </Row>
      <Row>
        <RowText>Taxes</RowText>
        <RowText>${cart && cart.taxPrice}</RowText>
      </Row>
      <Row>
        <RowText>Shipping</RowText>
        {shippingInformation ?
          <EditShipping onClick={() => navigate('/shipping')}>Edit Shipping</EditShipping>
          :
          <AddShipping onClick={() => navigate('/shipping')}>Add shipping</AddShipping>
          }
      </Row>
      {(!cart?.items?.length || !shippingInformation) ?
          <OrderButton disabled>CONFIRM ORDER</OrderButton>
          :
          <OrderButton onClick={() => dispatch(createOrder())} >CONFIRM ORDER</OrderButton>
         }
    </View>
  )
}

const OrderItems = styled.ul`
  padding: 0 1rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  flex: 2;
  @media (min-width: 750px) {
  position: absolute;
  left: 0%;
  width: 25rem;
  top: 8%;
  bottom: 5%;
}
@media (min-width: 850px) {
  left: 0%;
  width: 30rem;
}
@media (min-width: 950px) {
  left: 5%;
  width: 30rem;
}

@media (min-width: 1350px) {
  left: 20%;
  width: 30rem;
}
`
const Item = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100%;
  border-bottom: 2px solid rgba(235, 198, 36, 0.945);
`
const Image = styled.img`
  width: 50%;
  object-position: 0% 0%;
`
const ImageContainer = styled.div`
  flex: 2;
  height: 10rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  backgroundColor: transparent;
`
const Title = styled.h4`
flex: 3;
  color: rgba(235, 198, 36, 0.945);
  font-weight: 700;
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`
const Quantity = styled.p`
flex: 1;
  text-align: center;
  font-size: 1.5rem;
  width: 4rem;
  border-radius: 1rem;
  padding: .2rem .1rem;
  margin: 0;
  color: rgba(235, 198, 36, 0.945);
`
const OrderButton = styled(Button)`
margin-bottom: 2rem;
`
const AddShipping = styled(RowText)`
color: red;
`
const EditShipping = styled(RowText)`
color: blue;
`


