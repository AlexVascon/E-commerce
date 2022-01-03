import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrders } from '../actions/orderActions'
import { View, Heading, LoadingSpinner } from '../components/MyLibrary'
import { Table, TR, TH, TD, Button } from '../components/Table'
import { useNavigate } from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'
import ReactPaginate from 'react-paginate'

export default function OrderList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allOrders, fetchAllOrdersLoading } = useSelector(
    (state) => state.fetchAllOrders
  )
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    dispatch(fetchAllOrders(pageNumber))
  }, [dispatch, pageNumber])

  const changePage = ({ selected }) => setPageNumber(selected)

  const pagination = () => {
    return (
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={allOrders && allOrders.pageCount}
        onPageChange={changePage}
        forcePage={pageNumber}
        containerClassName={'pagination-btns'}
        previousLinkClassName={'previous-btn'}
        nextLinkClassName={'next-btn'}
        disabledClassName={'pagination-disabled'}
        activeClassName={'pagination-active'}
      />
    )
  }

  return (
    <View>
      <Heading center size='1.5rem' top='1%' bottom='1%'>
        All Orders
      </Heading>
      {fetchAllOrdersLoading && <LoadingSpinner />}
      <Table>
        <thead>
          <TR>
            <TH width='1%'>ID</TH>
            <TH width='5%'>USER</TH>
            <TH width='5%'>DATE</TH>
            <TH width='5%'>TOTAL</TH>
            <TH width='5%'>PAID</TH>
            <TH width='5%'>DELIVERED</TH>
            <TH width='5%'>DETAILS</TH>
          </TR>
        </thead>
        <tbody>
          {allOrders &&
            allOrders.orders.map((order) => {
              return (
                <TR key={order._id}>
                  <TD>{order._id}</TD>
                  <TD>{order.user && order.user.username}</TD>
                  <TD>{order.createdAt.substring(0, 10)}</TD>
                  <TD>${order.totalPrice}</TD>
                  <TD>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <CloseIcon />
                    )}
                  </TD>
                  <TD>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <CloseIcon />
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
      {allOrders && pagination()}
    </View>
  )
}
