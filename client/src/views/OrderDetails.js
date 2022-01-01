import React, { useEffect} from 'react'
import { View, SubTitle, List, Row, RowText, Container, HoldImage, SubContainer, Error, LoadingSpinner, Heading } from '../components/MyLibrary'
import { useDispatch, useSelector } from "react-redux"
import { useParams} from 'react-router-dom'
import { fetchOrder } from "../actions/orderActions"
import styled from 'styled-components'

export default function OrderDetails() {
  const {orderId} = useParams()
  const dispatch = useDispatch()
  const { foundOrder, fetchOrderError, fetchOrderLoading } = useSelector((state) => state.fetchOrder)

  useEffect(() => {
    dispatch(fetchOrder(orderId))
  }, [orderId, dispatch])

  return (
    <View responsive>
    <Heading>Order details</Heading>
    {fetchOrderLoading && <LoadingSpinner />}
    {fetchOrderError && <Error>{fetchOrderError}</Error>}
    {foundOrder && 
      <Information>
      <Summary >
      <SubTitle>Order Summary</SubTitle>
      <Row>
        <RowText>Items</RowText>
        <RowText>${foundOrder.totalPrice}</RowText>
      </Row>
      <Row>
      <RowText>Shipping</RowText>
        <RowText>$0</RowText>
      </Row>
      <Row>
      <RowText>Tax</RowText>
        <RowText>${foundOrder.taxPrice}</RowText>
      </Row>
      <Row>
      <RowText>Total</RowText>
        <RowText>${foundOrder.taxPrice + foundOrder.totalPrice}</RowText>
      </Row>
      </Summary>
      <Shipping>
      <SubTitle>Shipping</SubTitle>
        <Row>
          <RowText>Name</RowText>
          <RowText>{foundOrder.user.username}</RowText>
        </Row>
        <Row>
          <RowText>Email</RowText>
          <RowText>{foundOrder.user.email}</RowText>
        </Row>
        <Row>
          <RowText>Address</RowText>
          <RowText>{foundOrder.shippingAddress.address + ' ' + foundOrder.shippingAddress.city + ' ' + foundOrder.shippingAddress.postCode}</RowText>
        </Row>
      </Shipping>
      <PaymentMethod>
        <SubTitle>Payment Method</SubTitle>
        <Row>
          <RowText>Method Paypal</RowText>
        </Row>
      </PaymentMethod>
      </Information>
    }
      <ItemsList scroll>
      <SubTitle>Items</SubTitle>
      {foundOrder && foundOrder.items.map(item => (
      <Item width='90%' border key={item.itemId}>
      <HoldImage background>
        <img src={item.image} alt='' />
      </HoldImage>
      <Name flex='3' column center>{item.name}</Name>
      <Quantity flex='1' column center>{item.quantity}</Quantity>
      <Price flex='1' column center>${item.price * item.quantity}</Price>
      </Item>
      ))}
      </ItemsList>

    </View>
  )
}

const Information = styled(List)``
const Summary = styled(List)``
const Shipping = styled(List)``
const PaymentMethod = styled(List)``
const ItemsList = styled(List)`
min-height: 100%;
`
const Item = styled(Container)``

const Name = styled(SubContainer)`
font-size: 1.4rem;
color: rgba(235, 198, 36, 0.945);
overflow-wrap: break-word;
`
const Quantity = styled(SubContainer)`
color: rgba(235, 198, 36, 0.945);
font-weight: bold;
font-size: 1.2rem;
`
const Price = styled(SubContainer)`
font-size: 1.4rem;
color: rgba(235, 198, 36, 0.945);
overflow-wrap: break-word;
`