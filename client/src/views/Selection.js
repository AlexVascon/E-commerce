import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import { Image } from '../components/Image'
import {View, Section} from '../components/View'
import MenImg from '../assets/men.jpg'
import WomenImg from '../assets/women.jpg'
import styled, {css} from 'styled-components'
import Card from '../components/Card'
import ReactPaginate from 'react-paginate'
import ReactStars from 'react-rating-stars-component'


export default function Selection() {
  const {gender} = useParams()
  const dispatch = useDispatch()
  const {foundProducts} = useSelector((state) => state.fetchProducts)
  const [category, setCategory] = useState('shirt') // default
  const [pageNumber, setPageNumber] = useState(0)

  const requestCategory = (category) => {
    setCategory(category)
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
        <List isActive={category === 'shirt'} onClick={() => requestCategory('shirt')}>SHIRT</List>
        <List isActive={category === 'jumper'} onClick={() => requestCategory('jumper')}>JUMPER</List>
        <List isActive={(gender === 'men' && category === 'suit') || (gender === 'women' && category === 'dress')} onClick={() => requestCategory(gender === 'women' ? 'dress' : 'suit')}>{gender === 'women' ? 'DRESS' : 'SUIT'}</List>
      </Categories>
      </Image>
    </Section>
    <Section>
    <SelectionItems>
    {foundProducts && foundProducts.products.map(item => {
      return (
      <Card.Container to={`/product/${item._id}`} key={item._id} >
      <Card.Rating>
        <ReactStars
          count={5}
          value={item.rating || 0}
          size={25}
          activeColor="#ffd700"
        />
      {!item.rating && <Card.NoRating>No Rating</Card.NoRating>}
      </Card.Rating>
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
&:hover {
    cursor: pointer;
  }
${(props) => props.isActive && css`
text-shadow: 0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00;
`}
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
