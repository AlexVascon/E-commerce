import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { fetchProductInformation } from '../actions/productActions'
import { ViewResponsive, Section, List, Row, RowText, RowResponsive } from '../components/View'
import {Button} from '../components/Button'
import productImg from '../assets/fade_item_background.jpg'
import styled from 'styled-components'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';

export default function Product() {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const {foundProductInformation} = useSelector((state) => state.fetchProductInformation)
  const [openDescription, setOpenDescription] = useState(false)
  const [openReviews, setOpenReviews] = useState(false)

  useEffect(() => {
    dispatch(fetchProductInformation(productId))
  }, [dispatch, productId])



  return (
    <ViewResponsive>
      <Section imageUrl={process.env.PUBLIC_URL + productImg}>
      <Display>
      <Title>{foundProductInformation && foundProductInformation.title}</Title>
      <Price>${foundProductInformation && foundProductInformation.price}</Price>
      <ImageContainer>
        <Image src={foundProductInformation && foundProductInformation.image} />
      </ImageContainer>
      </Display>
      </Section>
      <Section>
        <List>
        <RowResponsive onClick={() => setOpenReviews(!openReviews)}>
          <Row>
          <RowText>Review</RowText>
          {
            !openReviews 
            ?
            <ExpandCircleDownOutlinedIcon fontSize='large' />
            :
            <ExpandLessOutlinedIcon fontSize='large' />
          }
          </Row>
          {openReviews 
          &&
          <ReviewsContainer>

          </ReviewsContainer>
          }
          
        </RowResponsive>
          <Row>
          <RowText>Stock</RowText>
          <RowText>{foundProductInformation?.quantity > 0 ? 'In stock' : 'Out of stock'}</RowText>
          </Row>
          <RowResponsive>
          <Row onClick={() => setOpenDescription(!openDescription)}>
          <RowText>Description</RowText>
          {
            !openDescription 
            ?
            <ExpandCircleDownOutlinedIcon fontSize='large' />
            :
            <ExpandLessOutlinedIcon fontSize='large' />
          }
          </Row>
          {openDescription 
          &&
          <DescriptionContainer>
            <Description>{foundProductInformation && foundProductInformation.description}</Description>
          </DescriptionContainer>
          }
          </RowResponsive>
        </List>
        <Button light={true}>ADD TO CART</Button>
      </Section>
    </ViewResponsive>
  )
}

const Display = styled.div`
 flex: 1;
 position: relative;
 width: 100%;
`

const Title = styled.h2`
position: absolute;
  bottom: 3%;
  left: 5%;
  width: 100%;
  color: rgb(214, 175, 1);
  font-size: 4rem;
  font-weight: 700;
  z-index: 3;
`
const Price = styled.p`
position: absolute;
bottom: 3%;
left: 5%;
max-width: 100%;
padding: .5rem .8rem;
  border-radius: 1rem;
  background-color: rgba(94, 94, 94, 0.945);
  color: white;
`

const Image = styled.img`
`
const ImageContainer = styled.div`
position: absolute;
  bottom: 15%;
  right: 0%;
  z-index: 1;
`

const DescriptionContainer = styled.div`
 display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 10rem;
  width: 100%;
`

const Description = styled.p``

const ReviewsContainer = styled.div`
display: flex;
  flex-direction: column;
  height: 25rem;
  width: 100%;
  overflow-y: scroll;
`


