import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, deleteProduct } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { View, Heading, Error, LoadingSpinner } from '../components/MyLibrary'
import { Table, TR, TH, TD, Button } from '../components/Table'
import ReactPaginate from 'react-paginate'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ProductList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let page
  const pageStorage = localStorage.getItem('productListPage')
  if (pageStorage) page = Number(pageStorage)
  const { foundProducts, fetchAllProductsError, fetchAllProductsLoading } =
    useSelector((state) => state.fetchAllProducts)
  const [pageNumber, setPageNumber] = useState(page || 0)

  useEffect(() => {
    dispatch(fetchAllProducts(pageNumber))
  }, [dispatch, pageNumber])

  const changePage = ({ selected }) => setPageNumber(selected)

  const pagnation = () => {
    return (
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={foundProducts && foundProducts.pageCount}
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
      <Heading center size='1.5rem' bottom='1%' top='1%'>
        Products
      </Heading>
      <Create onClick={() => navigate('/admin/product/create')}>
        Create +
      </Create>

      <Table>
        <thead>
          <TR>
            <TH width='7%'>ID</TH>
            <TH width='10%'>NAME</TH>
            <TH width='6%'>PRICE</TH>
            <TH width='8%'>SELECTION</TH>
            <TH width='6%'>CATEGORY</TH>
            <TH width='6%'>EDIT</TH>
            <TH width='6%'>DELETE</TH>
          </TR>
        </thead>
        <tbody>
          {foundProducts &&
            foundProducts.products.map((product) => {
              return (
                <TR key={product._id}>
                  <TD>{product._id}</TD>
                  <TD>{product.title}</TD>
                  <TD>${product.price}</TD>
                  <TD>{product.selection}</TD>
                  <TD>{product.category}</TD>
                  <TD>
                    <Button
                      onClick={() =>
                        navigate(`/admin/product/update/${product._id}`)
                      }
                    >
                      Edit
                    </Button>
                  </TD>
                  <TD>
                    <Bin onClick={() => dispatch(deleteProduct(product._id))}>
                      Delete
                    </Bin>
                  </TD>
                </TR>
              )
            })}
        </tbody>
      </Table>
      {fetchAllProductsLoading && <LoadingSpinner size='10rem' />}
      {fetchAllProductsError && <Error>{fetchAllProductsError}</Error>}
      {pagnation()}
    </View>
  )
}

const Create = styled(Button)`
  position: absolute;
  margin: auto;
  right: 5%;
  top: 1%;
`
const Bin = styled(DeleteIcon)``
