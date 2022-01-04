import React, { useEffect } from 'react'
import {
  View,
  SubTitle,
  List,
  Row,
  RowText,
  Container,
  HoldImage,
  SubContainer,
  Error,
  LoadingSpinner,
  Heading,
  Button,
} from '../components/MyLibrary'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchOrder } from '../actions/orderActions'
import { markOrderDelivered } from '../actions/orderActions'
import styled from 'styled-components'

export default function OrderDetails() {
  const { orderId } = useParams()
  const dispatch = useDispatch()
  const { foundOrder, fetchOrderError, fetchOrderLoading } = useSelector(
    (state) => state.fetchOrder
  )
  const { markOrderDeliveredSuccess, loadingMarkOrderDelivered } = useSelector(
    (state) => state.markOrderDelivered
  )
  const { userInfo } = useSelector((state) => state.authenticate)

  useEffect(() => {
    dispatch(fetchOrder(orderId))
  }, [orderId, dispatch])

  const handleSubmitDelivered = (orderId) => {
    dispatch(markOrderDelivered(orderId))
  }

  useEffect(() => {
    if (markOrderDeliveredSuccess) window.location.reload()
  }, [markOrderDeliveredSuccess])

  return (
    <View responsive>
      <Heading static>Order details</Heading>
      {loadingMarkOrderDelivered && <LoadingSpinner />}
      {fetchOrderLoading && <LoadingSpinner />}
      {fetchOrderError && <Error>{fetchOrderError}</Error>}
      {foundOrder && (
        <Information>
          <Summary>
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
              <RowText>
                {foundOrder.shippingAddress.address +
                  ' ' +
                  foundOrder.shippingAddress.city +
                  ' ' +
                  foundOrder.shippingAddress.postCode}
              </RowText>
            </Row>
          </Shipping>
          <PaymentMethod>
            <SubTitle>Payment Method</SubTitle>
            <Row>
              <RowText>Method</RowText>
              <RowText>Card</RowText>
            </Row>
            <Row>
              <RowText>Paid</RowText>
              <RowText>
                {foundOrder.isPaid
                  ? foundOrder.paidAt.substring(0, 10)
                  : 'Not paid'}
              </RowText>
            </Row>
            <Row>
              <RowText>Delivered</RowText>
              <RowText>
                {foundOrder.isDelivered
                  ? foundOrder.deliveredAt.substring(0, 10)
                  : 'Not delivered'}
              </RowText>
            </Row>
          </PaymentMethod>
          {userInfo &&
            userInfo.isAdmin &&
            foundOrder.isPaid &&
            !foundOrder.isDelivered && (
              <Admin>
                <SubTitle>Admin</SubTitle>
                <Row>
                  <RowText>Mark Delivered</RowText>
                  <Confirm
                    onClick={() => handleSubmitDelivered(foundOrder._id)}
                  >
                    CONFIRM
                  </Confirm>
                </Row>
              </Admin>
            )}
        </Information>
      )}
      <ItemSubTitle>Items</ItemSubTitle>
      <ItemsList scroll>
        {foundOrder &&
          foundOrder.items.map((item) => (
            <Item width='90%' border key={item.itemId}>
              <HoldImage background>
                <img src={item.image} alt='' />
              </HoldImage>
              <Name flex='3' column center>
                {item.name}
              </Name>
              <Quantity flex='1' column center>
                {item.quantity}
              </Quantity>
              <Price flex='1' column center>
                ${item.price * item.quantity}
              </Price>
            </Item>
          ))}
      </ItemsList>
    </View>
  )
}

const Information = styled(List)``
const Summary = styled(List)`
  width: 90%;
`
const Shipping = styled(List)`
  width: 90%;
`
const PaymentMethod = styled(List)`
  width: 90%;
`
const Admin = styled(List)`
  width: 90%;
  align-items: center;
`
const ItemsList = styled(List)`
  min-height: 100%;
  @media (min-width: 600px) {
    margin-top: 3rem;
  }
`
const Item = styled(Container)`
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;
  width: 90%;
`

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
const Confirm = styled(Button)`
  width: 10rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`
const ItemSubTitle = styled(SubTitle)`
  width: 30%;
  margin-left: 5%;
  @media (min-width: 600px) {
    position: absolute;
    top: 1%;
    left: 53%;
    margin-left: 0%;
    width: 100%;
  }
`
