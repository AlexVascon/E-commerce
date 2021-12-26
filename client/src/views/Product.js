import React, {useEffect, useState} from 'react'
import {useParams, Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {authenticate} from '../actions/userActions'
import { fetchProductInformation, createProductReview, fetchProductReviews, fetchSimilarProducts } from '../actions/productActions'
import { addItemToCart } from '../actions/cartActions'
import { ViewResponsive, Section, List, Row, RowText, RowResponsive } from '../components/View'
import { Form, TextArea } from '../components/Form'
import {Button} from '../components/Button'
import productImg from '../assets/fade_item_background.jpg'
import styled from 'styled-components'
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined'
import ReactStars from 'react-rating-stars-component'
import Dialog from '@mui/material/Dialog'
import { useSnackbar } from 'notistack'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import cardBackgroundImg from '../assets/donught_corner_img.jpg'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export default function Product() {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const {reviewSuccess} = useSelector((state) => state.createProductReview)
  const {reviews} = useSelector((state) => state.fetchProductReviews)
  const {foundProductInformation} = useSelector((state) => state.fetchProductInformation)
  const {similarProducts} = useSelector((state) => state.fetchSimilarProducts)
  const {userInfo} = useSelector((state) => state.authenticate)
  const { enqueueSnackbar } = useSnackbar();
  const [openDescription, setOpenDescription] = useState(false)
  const [openReviews, setOpenReviews] = useState(false)
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const [hasReviewed, setHasReviewed] = useState(false)
  const [openReviewForm, setOpenReviewForm] = useState(false)

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProductInformation(productId))
    dispatch(fetchSimilarProducts(productId))
  }, [dispatch, productId])

  useEffect(() => {
    dispatch(fetchProductReviews(productId))
  }, [dispatch, productId])

  useEffect(() => {
    if(reviews) {
      const {_id} = userInfo
      const userReview = reviews.list.filter(review => review.userId === _id)
      userReview.length ? setHasReviewed(true) : setHasReviewed(false)
    }
  }, [reviews, userInfo, hasReviewed])

  const ratingChanged = (newRating) => setRating(newRating)
  const handleDescriptionChange = (e) => setDescription(e.target.value)
  const closeReviewForm = () => setOpenReviewForm(false)

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const body = { productId, rating, description }
    dispatch(createProductReview(body))
  }

  useEffect(() => {
    if(reviewSuccess) closeReviewForm()
  }, [reviewSuccess])

  const handleClickAddItemToCart = (variant) => () => {
    dispatch(addItemToCart(productId))
    enqueueSnackbar('Added to cart!', { variant, anchorOrigin: {horizontal: 'left',vertical: 'top'}, autoHideDuration: 1000})
  }

  return (
    <ViewResponsive>
      <Section imageUrl={process.env.PUBLIC_URL + productImg}>
      <Display>
      <Title>{foundProductInformation && foundProductInformation.title}</Title>
      <Price>${foundProductInformation && foundProductInformation.price}</Price>
      <ImageContainer>
        <Image src={foundProductInformation && foundProductInformation.image} />
      </ImageContainer>
      <ProductRating>
      {foundProductInformation && 
      <ReactStars
        count={5}
        value={foundProductInformation.rating}
        size={24}
        activeColor="#ffd700"
        edit={false}
      />}
      </ProductRating>
      </Display>
      </Section>
      <Section>
        <Information>
        <Row onClick={() => setOpenReviews(!openReviews)}>
          <RowText>Reviews {reviews && reviews.list?.length}</RowText>
          {!openReviews ?
            <ExpandCircleDownOutlinedIcon fontSize='large' />
            :
            <ExpandLessOutlinedIcon fontSize='large' />
          }
        </Row>
        {openReviews &&
          <ReviewsContainer>
          <ReviewsList>
          {!reviews?.list?.length && <RowText>No Reviews</RowText>}
          {reviews?.list && reviews.list.map(review => {
            return (
              <RowResponsive key={review._id} >
              <ReactStars
                count={5}
                value={review.rating}
                size={24}
                activeColor="#ffd700"
              />
              <RowText>{review.description}</RowText>
              </RowResponsive>
            )
          })}
          </ReviewsList>
          <Dialog open={openReviewForm} onClose={closeReviewForm}>
          <ReviewForm onSubmit={handleSubmitReview}>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor='#ffd700'
          />
            <TextArea rows='4' cols='50' type='text' value={description}
              onChange={handleDescriptionChange}
              placeholder='write review..' 
            />
            <Button type='submit'>SUBMIT REVIEW</Button>
          </ReviewForm>
          </Dialog>
          {!userInfo && <RowText>Please login to write a review</RowText>}
          {(userInfo && hasReviewed) ? 
          <RowText>Cannot write more than one review</RowText>
          :
          <Button onClick={() => setOpenReviewForm(true)}>ADD REVIEW</Button>
          }
          </ReviewsContainer>
          }
          <Row>
          <RowText>Stock</RowText>
          <RowText>{foundProductInformation?.quantity > 0 ? 'In stock' : 'Out of stock'}</RowText>
          </Row>
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
        </Information>
        <SubTitle>Similar products</SubTitle>
        <SimilarProducts>
        <AutoPlaySwipeableViews slideClassName='item-suggestions-carousel'>
        {similarProducts && similarProducts.map(product => {
          return (
            <Link key={product._id} to={`/product/${product._id}`}>
            <SimilarImage src={product.image} />
            </Link>
          )
        })}
        </AutoPlaySwipeableViews>
        </SimilarProducts>
        {foundProductInformation?.quantity > 0 ? 
          <AddToCartButton onClick={handleClickAddItemToCart('success')}>ADD TO CART</AddToCartButton>
          :
          <AddToCartButton disabled >ADD TO CART</AddToCartButton>
        }
        
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
const Information = styled(List)`
flex: 2;
margin: auto;
margin-top: 1rem;
justify-content: center;
align-items: center;
text-align: center;
padding: 0;
width: 100%;
margin-bottom: 1rem;
`
const DescriptionContainer = styled.div`
 display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 10rem;
  width: 100%;
`
const Description = styled.p``

const ProductRating = styled.div`
position: absolute;
right: 30%;
`
const ReviewsContainer = styled.div`
display: flex;
  flex-direction: column;
  height: 25rem;
  width: 100%;
  overflow-y: scroll;
`
const ReviewForm = styled(Form)`
padding: 2rem;
justify-content: center;
align-items: center;
`
const ReviewsList = styled.ul`
height: 25rem;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  gap: .5rem;
  position: relative;
`
const AddToCartButton = styled(Button)`
width: 90%;
justify-self: center;
margin: auto;
margin-top: 1rem;
margin-bottom: 3rem;
`
const SubTitle = styled.h1`
  width: 100%;
  text-align: left;
  padding-left: 1.5rem;
  font-weight: 700;
  color: rgba(235, 198, 36, 0.945);
  font-size: 1.5rem;
`

const SimilarProducts = styled.div`
flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(212, 212, 212, 0.185);
`
const SimilarImage = styled.img`
height: 18rem;
width: 13rem;
  background-image: url(${cardBackgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0 2rem;
  border-radius: .2rem;
  display: flex;
  justify-content: center;
`



