import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../actions/productActions'
import { View, Section, Absolute } from '../components/MyLibrary'
import MenImg from '../assets/men.jpg'
import WomenImg from '../assets/women.jpg'
import cardBackgroundImg from '../assets/donught_corner_img.jpg'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'
import ReactStars from 'react-rating-stars-component'

export default function Selection() {
  const { gender } = useParams()
  const dispatch = useDispatch()
  const { foundProducts } = useSelector((state) => state.fetchProducts)
  const [category, setCategory] = useState('shirt') // default
  const [pageNumber, setPageNumber] = useState(0)

  const requestCategory = (category) => {
    setCategory(category)
    setPageNumber((pageNumber) => (pageNumber = 0))
  }

  useEffect(() => {
    dispatch(fetchProducts(gender, category, pageNumber))
  }, [dispatch, category, pageNumber, gender])

  const changePage = ({ selected }) => {
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
      <Section
        center
        imageUrl={
          process.env.PUBLIC_URL + gender === 'women' ? WomenImg : MenImg
        }
      >
        <Categories>
          <Choice
            isActive={category === 'shirt'}
            onClick={() => requestCategory('shirt')}
          >
            SHIRT
          </Choice>
          <Choice
            isActive={category === 'jumper'}
            onClick={() => requestCategory('jumper')}
          >
            JUMPER
          </Choice>
          <Choice
            isActive={
              (gender === 'men' && category === 'suit') ||
              (gender === 'women' && category === 'dress')
            }
            onClick={() =>
              requestCategory(gender === 'women' ? 'dress' : 'suit')
            }
          >
            {gender === 'women' ? 'DRESS' : 'SUIT'}
          </Choice>
        </Categories>
        <Indicator>Scroll down</Indicator>
      </Section>
      <Section>
        <SelectionItems>
          {foundProducts &&
            foundProducts.products.map((item) => {
              return (
                <Card to={`/product/${item._id}`} key={item._id}>
                  <Rating as='span' width='10rem' top='1%' left='5%' z='6'>
                    <ReactStars
                      count={5}
                      value={item.rating || 0}
                      size={25}
                      activeColor='#ffd700'
                      edit={false}
                    />
                    {!item.rating && <NoRating>No Rating</NoRating>}
                  </Rating>
                  <Image as='img' width='60%' z='1' src={item.image} />
                  <Name as='b' width='90%' bottom='18%' left='5%' z='2'>
                    {item.title}
                  </Name>
                  <Price as='span' width='20%' bottom='5%' left='5%'>
                    ${item.price}
                  </Price>
                </Card>
              )
            })}
        </SelectionItems>
        {category && pagnation()}
      </Section>
    </View>
  )
}

const Card = styled(Link)`
  background-image: url(${cardBackgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 80%;
  height: 22rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin: 1rem 0.4rem;
  border-radius: 0.5rem;
  position: relative;
  z-index: 4;
  background-color: rgba(214, 214, 214, 0.137);
  background-blend-mode: hue;
  box-shadow: 0px 13px 11px -5px rgba(0, 0, 0, 0.17);
  @media (min-width: 450px) {
    width: 14.5rem;
    height: 17rem;
  }
  @media (min-width: 550px) {
    width: 14.5rem;
    height: 17rem;
    margin: 1rem;
  }
  @media (min-width: 750px) {
    width: 16.5rem;
    height: 20rem;
    margin: 1rem;
  }
`;
const Name = styled(Absolute)`
  font-size: 3rem;
  font-family: 'Roboto', sans-serif;
  overflow-wrap: break-word;
  line-height: 2.7rem;
  color: rgb(207, 159, 0);
`;
const Price = styled(Absolute)`
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  padding: 0.2rem 0.8rem;
  color: white;
  border-radius: 2rem;
  background-color: rgba(82, 81, 81, 0.788);
`;
const Image = styled(Absolute)`
  height: 100%;
  align-self: flex-end;
  padding: 0;
  margin: 0;
  z-index: 1;
  background-color: transparent;
`;
const Rating = styled(Absolute)``;

const NoRating = styled.p`
  color: #777;
  margin: 0%;
`;
const Categories = styled.ul`
  display: flex;
  color: rgba(255, 246, 189, 0.822);
  background-color: rgba(155, 155, 155, 0.27);
  width: 100vw;
  justify-content: center;
  gap: 3rem;
  padding: 0.7rem 0;
`;
const Choice = styled.li`
  display: flex;
  list-style-type: none;
  padding: 0;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.isActive &&
    'text-shadow: 0 -1px 4px #FFF, 0 -2px 10px #ff0, 0 -10px 20px #ff8000, 0 -18px 40px #F00;'}
`;
const SelectionItems = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  background-color: white;
`;
const Indicator = styled.p`
  position: absolute;
  bottom: 15%;
  left: 0%;
  right: 0%;
  margin: auto;
  color: rgba(255, 246, 189, 0.822);
  width: 5rem;
`;

