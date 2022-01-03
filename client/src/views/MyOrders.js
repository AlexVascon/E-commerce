import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyOrders } from '../actions/orderActions'
import { useNavigate } from 'react-router-dom'
import { View, Heading, Error, LoadingSpinner } from '../components/MyLibrary'
import { Table, TR, TH, TD, Button } from '../components/Table'

export default function MyOrders() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { myOrders, fetchMyOrdersError, fetchMyOrdersLoading } = useSelector(
    (state) => state.fetchMyOrders
  )

  useEffect(() => {
    dispatch(fetchMyOrders())
  }, [dispatch])

  return (
    <View>
      <Heading center size='1.5rem' bottom='1%' top='1%'>
        My Orders
      </Heading>
      {fetchMyOrdersLoading && <LoadingSpinner />}
      <Table>
        <thead>
          <TR>
            <TH>Items</TH>
            <TH>Date</TH>
            <TH>Total</TH>
            <TH>Paid</TH>
            <TH>View</TH>
          </TR>
        </thead>
        <tbody>
          {myOrders &&
            myOrders.map((order) => {
              return (
                <TR key={order._id}>
                  <TD>{order.items.length}</TD>
                  <TD>{order.createdAt.substring(0, 10)}</TD>
                  <TD>${order.totalPrice}</TD>
                  <TD>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <Button
                        onClick={() => navigate(`/order/pay/${order._id}`)}
                      >
                        Pay
                      </Button>
                    )}
                  </TD>
                  <TD>
                    <Button onClick={() => navigate(`/order/${order._id}`)}>
                      Details
                    </Button>
                  </TD>
                </TR>
              )
            })}
        </tbody>
      </Table>
      {fetchMyOrdersError && <Error>{fetchMyOrdersError}</Error>}
    </View>
  )
}
