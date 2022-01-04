import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems } from '../actions/cartActions'
import { fetchShippingInformation } from '../actions/userActions'
import { createOrder } from '../actions/orderActions'
import {
  View,
  Row,
  RowText,
  Button,
  Error,
  Heading,
  Container,
  List,
  LoadingSpinner,
} from '../components/MyLibrary'
import styled from 'styled-components'
import successImg from '../assets/success.png'
import Dialog from '@mui/material/Dialog'
import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart, fetchCartError } = useSelector((state) => state.fetchCartItems)
  const { shippingInformation } = useSelector(
    (state) => state.fetchShippingInformation
  )
  const { order, createOrderLoading } = useSelector(
    (state) => state.createOrder
  )
  const [open, setOpen] = useState(false)

  const handleOpenSuccess = () => setOpen(true)
  const handleCloseSuccess = () => {
    setOpen(false)
    navigate(`/order/pay/${order._id}`)
  }

  useEffect(() => {
    dispatch(fetchCartItems())
    dispatch(fetchShippingInformation())
  }, [dispatch])

  useEffect(() => {
    if (order) handleOpenSuccess()
  }, [order, navigate])

  return (
    <View responsive>
      <Heading static top='0%' left='5%'>
        Chekout
      </Heading>
      {createOrderLoading && <LoadingSpinner />}
      {fetchCartError && <Error>{fetchCartError}</Error>}
      <Order scroll>
        {cart &&
          cart.items.map((item) => {
            return (
              <Item width='90%' border key={item.itemId}>
                <ImageContainer>
                  <Image src={item.image} />
                </ImageContainer>
                <Title>{item.name}</Title>
                <Quantity>{item.quantity}</Quantity>
              </Item>
            )
          })}
      </Order>
      <CostInformation>
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
          {shippingInformation ? (
            <EditShipping onClick={() => navigate('/shipping')}>
              Edit Shipping
            </EditShipping>
          ) : (
            <AddShipping onClick={() => navigate('/shipping')}>
              Add shipping
            </AddShipping>
          )}
        </Row>
        {!cart?.items?.length || !shippingInformation ? (
          <Message disabled>SHIPPING REQUIRED</Message>
        ) : (
          <OrderButton onClick={() => dispatch(createOrder())}>
            CONFIRM ORDER
          </OrderButton>
        )}
      </CostInformation>
      <Dialog open={open} onClose={handleCloseSuccess}>
        <SuccessMessage>
          <SuccessImage src={successImg} alt='' />
          <b>Order placed</b>
          <p>Awaiting transaction</p>
          <Button onClick={handleCloseSuccess}>Continue</Button>
        </SuccessMessage>
      </Dialog>
    </View>
  )
}

const Order = styled(List)`
  flex: 1.5;
  @media (min-width: 600px) {
    margin-top: 3rem;
  }
`
const Item = styled(Container)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
  backgroundcolor: transparent;
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
  padding: 0.2rem 0.1rem;
  margin: 0;
  color: rgba(235, 198, 36, 0.945);
`
const OrderButton = styled(Button)`
  margin-bottom: 2rem;
`
const Message = styled(Button)`
  background-color: transparent;
  box-shadow: none;
  &:hover {
    cursor: none;
  }
`
const AddShipping = styled(RowText)`
  color: red;
  &:hover {
    cursor: pointer;
  }
`
const EditShipping = styled(RowText)`
  color: blue;
  &:hover {
    cursor: pointer;
  }
`
const CostInformation = styled(List)``

const SuccessImage = styled.img`
  width: 5rem;
  height: 5rem;
  background-color: transparent;
`
const SuccessMessage = styled.div`
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 1.5rem;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: none;
  margin: auto;
  margin-bottom: 0;
  @media (min-width: 550px) {
    max-width: 30rem;
  }
`
