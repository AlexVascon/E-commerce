import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchMyOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import { View } from '../components/View'
import { Button } from '../components/Button'
import styled from 'styled-components'

export default function MyOrders() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {myOrders} = useSelector((state) => state.fetchMyOrders)

  useEffect(() => {
    dispatch(fetchMyOrders())
  }, [dispatch])

  return (
    <View>
    <p>My Orders</p>
      <MyOrderItems>
      {myOrders && myOrders.map(order => {
        return (
          <Order key={order._id}>
          <Information>
            <Text>TotalCost: {order.totalPrice}</Text>
            <Text>Items: {order.items.length}</Text>
          </Information>
          <Status>
            {order && order.isPaid ? 
            <Text>Paid</Text>
            :
            <>
            <Text>Not Paid</Text>
            <Button onClick={() => navigate(`/order/pay/${order._id}`)}>PAY</Button>
            </>
            }
          </Status>
          </Order>
        )
      })}
      </MyOrderItems>
    </View>
  )
}

const MyOrderItems = styled.ul`
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
const Order = styled.div`
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
const Information = styled.div`
flex: 2;
display: flex;
text-align: start;
flex-direction: column;
`
const Text = styled.p`
`
const Status = styled.div`
flex: 1;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

