import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts, deleteProduct } from '../actions/productActions'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { View, Heading, Error } from '../components/MyLibrary'
import ReactPaginate from 'react-paginate'
import DeleteIcon from '@mui/icons-material/Delete'

export default function ProductList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { foundProducts, fetchAllProductsError } = useSelector((state) => state.fetchAllProducts)
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    dispatch(fetchAllProducts(pageNumber))
  }, [dispatch, pageNumber])

  const changePage = ({ selected }) => setPageNumber(selected)
  
  const pagnation = () => {
    return (
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={foundProducts && foundProducts.count / 10}
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
          <Heading center size='1.5rem'>
        Products
      </Heading>
      <Create onClick={() => navigate('/product/create')}>Create +</Create>
      <Table>
        <Row>
          <RowTitle width='7%'>ID</RowTitle>
          <RowTitle width='10%'>NAME</RowTitle>
          <RowTitle width='6%'>PRICE</RowTitle>
          <RowTitle width='8%'>SELECTION</RowTitle>
          <RowTitle width='6%'>CATEGORY</RowTitle>
          <RowTitle width='6%'>EDIT</RowTitle>
          <RowTitle width='6%'>DELETE</RowTitle>
        </Row>
        <tbody>
        {foundProducts &&
          foundProducts.products.map((product) => {
            return (
              <Row key={product._id}>
                <Data>{product._id}</Data>
                <Data>{product.title}</Data>
                <Data>${product.price}</Data>
                <Data>{product.selection}</Data>
                <Data>{product.category}</Data>
                <Data>
                    <Button onClick={() => navigate(`/product/update/${product._id}`)}>
                      Edit
                    </Button>
                </Data>
                <Data>
                    <Bin onClick={() => dispatch(deleteProduct(product._id))}>
                      Delete
                    </Bin>
                </Data>
              </Row>
            )
          })}
          </tbody>
      </Table>
      {fetchAllProductsError && <Error>{fetchAllProductsError}</Error>}
      {pagnation()}
    </View>
  )
}

const Table = styled.table`
  width: 100%;
  bproduct-collapse: collapse;
  overflow-wrap: break-word;
  table-layout:fixed;
`
const Row = styled.tr`
  width: 5%;
    overflow-wrap: break-word;
  &:nth-child(even) {
    background-color: #dddddd;
  }
`
const RowTitle = styled.th`
  bproduct: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  overflow-wrap: break-word;
  @media(max-width: 415px) {
    font-size: .6rem;
    width: ${props => props.width}
    overflow-wrap: break-word;
  }
`
const Data = styled.td`
  bproduct: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  @media(max-width: 415px) {
    font-size: .8rem;
    max-width: 2rem;
    overflow-x: scroll;
  }
`
const Button = styled.button`
  border: none;
  background-color: rgba(235, 198, 36, 0.945);
  color: black;
  font-weight: 900;
  padding: 0.2rem;
  border-radius: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`
const Create = styled(Button)`
position: absolute;
margin: auto;
right: 5%;
top: 1%;
`
const Bin = styled(DeleteIcon)``