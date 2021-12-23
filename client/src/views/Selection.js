import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import { Image } from '../components/Image'
import {View, Section} from '../components/View'
import MenImg from '../assets/ruthson-zimmerman-hDANeGXvWRw-unsplash.jpg'
import WomenImg from '../assets/zeny-rosalina-Z3tc0Bfv0c4-unsplash.jpg'
import styled from 'styled-components'
import Card from '../components/Card'
import ReactPaginate from 'react-paginate'


export default function Selection() {
  const {gender} = useParams()
  const dispatch = useDispatch()
  const {foundProducts} = useSelector((state) => state.fetchProducts)
  const [category, setCategory] = useState('shirt') // default
  const [pageNumber, setPageNumber] = useState(0)
  const [restPagnation, setResetPagnation] = useState(true)

  const requestCategory = (category) => {
    setCategory(category)
    setResetPagnation(true)
    setPageNumber(pageNumber => pageNumber = 0)
  }

  useEffect(() => {
    dispatch(fetchProducts(gender, category, pageNumber))
  }, [dispatch, category, pageNumber, gender])


  const changePage = ({selected}) => {
    setPageNumber(selected)
  }

  const pagnation = () => {
    return (
      <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      pageCount={2}
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
    <Section>
      <Image imageUrl={process.env.PUBLIC_URL + gender === 'women' ? WomenImg : MenImg}>
      <Categories>
        <List onClick={() => requestCategory('shirt')}>SHIRT</List>
        <List onClick={() => requestCategory('jumper')}>JUMPER</List>
        <List onClick={() => requestCategory(gender === 'women' ? 'dress' : 'suit')}>{gender === 'women' ? 'DRESS' : 'SUIT'}</List>
      </Categories>
      </Image>
    </Section>
    <Section>
    <SelectionItems>
    {foundProducts && foundProducts.products.map(item => {
      return (
        
      <Card.Container to={`/product/${item._id}`} key={item._id} >
      <Card.Image src={item.image}  />
      <Card.Title>{item.title}</Card.Title>
      <Card.Price>${item.price}</Card.Price>
    </Card.Container>
      )
    })}
    </SelectionItems>
    {category && pagnation()}
    </Section>
    </View>
  )
}

const Categories = styled.div`
display: flex;
color: rgba(255, 246, 189, 0.822);
background-color: rgba(0, 0, 0, 0.219);
width: 100vw;
justify-content: center;
gap: 3rem;
`

const List = styled.ul`
display: flex;
list-style-type: none;
padding: 0;
`

const SelectionItems = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
gap: 0;
width: 100%;
height: 90%;
overflow-y: scroll;
background-color: white;
`
