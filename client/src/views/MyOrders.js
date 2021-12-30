import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import { View, Heading } from '../components/MyLibrary'
import styled from 'styled-components'

export default function MyOrders() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { myOrders } = useSelector((state) => state.fetchMyOrders)

  useEffect(() => {
    dispatch(fetchMyOrders())
  }, [dispatch])

  return (
    <View>
      <Heading center size='1.5rem'>
        My Orders
      </Heading>
      <Table>
        <Row>
          <RowTitle>Items</RowTitle>
          <RowTitle>Date</RowTitle>
          <RowTitle>Total</RowTitle>
          <RowTitle>Paid</RowTitle>
        </Row>
        {myOrders &&
          myOrders.map((order) => {
            return (
              <Row>
                <Data>{order.items.length}</Data>
                <Data>{order.createdAt.substring(0, 10)}</Data>
                <Data>${order.totalPrice}</Data>
                <Data>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <Button onClick={() => navigate(`/order/pay/${order._id}`)}>
                      Pay
                    </Button>
                  )}
                </Data>
              </Row>
            )
          })}
      </Table>
    </View>
  )
}
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`
const Row = styled.tr`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`
const RowTitle = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`
const Data = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`
const Button = styled.button`
  border: none;
  background-color: rgba(235, 198, 36, 0.945);
  color: black;
  font-weight: 900;
  padding: 0.5rem;
  border-radius: 0.3rem;
`
