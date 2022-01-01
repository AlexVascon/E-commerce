import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../actions/userActions'
import {
  fetchProductInformation,
  createProductReview,
  fetchProductReviews,
  fetchSimilarProducts,
} from '../actions/productActions'
import { addItemToCart, addCartItemToAnonymous } from '../actions/cartActions'
import {
  View,
  Section,
  Heading,
  List,
  Row,
  RowText,
  Button,
  Absolute,
  Error,
  LoadingSpinner
} from '../components/MyLibrary'
import { Form, TextArea } from '../components/Form'
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
  const { productId } = useParams()
  const dispatch = useDispatch()
  const { reviewSuccess, createProductReviewError } = useSelector((state) => state.createProductReview)
  const { reviews, fetchProductReviewsError } = useSelector((state) => state.fetchProductReviews)
  const { foundProductInformation, fetchProductInformationError, fetchProductInformationLoading } = useSelector(
    (state) => state.fetchProductInformation
  )
  const { similarProducts, fetchSimilarProductsError } = useSelector(
    (state) => state.fetchSimilarProducts
  )
  const { userInfo } = useSelector((state) => state.authenticate)
  const { enqueueSnackbar } = useSnackbar()
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
    dispatch(fetchProductReviews(productId))
  }, [dispatch, productId])

  useEffect(() => {
    if (reviews && userInfo) {
      const { _id } = userInfo
      const userReview = reviews.list.filter((review) => review.userId === _id)
      userReview.length ? setHasReviewed(true) : setHasReviewed(false)
    }
  }, [reviews, userInfo, hasReviewed])

  const ratingChanged = (newRating) => setRating(newRating)
  const handleDescriptionChange = (e) => setDescription(e.target.value)
  const closeReviewForm = () => setOpenReviewForm(false)

  const handleSubmitReview = (e) => {
    e.preventDefault()
    const body = { productId, rating, description }
    dispatch(createProductReview(body))
  }

  useEffect(() => {
    if (reviewSuccess) closeReviewForm()
  }, [reviewSuccess])

  const handleClickAddItemToCart = (variant) => () => {
    if (!userInfo) dispatch(addCartItemToAnonymous(productId))
    else dispatch(addItemToCart(productId))
    enqueueSnackbar('Added to cart!', {
      variant,
      anchorOrigin: { horizontal: 'left', vertical: 'top' },
      autoHideDuration: 1000,
    })
  }

  return (
    <View responsive>
    {fetchProductInformationLoading && <LoadingSpinner />}
    {fetchProductInformationError && <Error>{fetchProductInformationError}</Error>}
      <Section imageUrl={process.env.PUBLIC_URL + productImg}>
          <Name top='2%' left='5%' width='90%' z='3'>
            {foundProductInformation && foundProductInformation.title}
          </Name>
          <Price as='p' bottom='15%' left='5%' width='3rem'>
            ${foundProductInformation && foundProductInformation.price}
          </Price>
          <ImageContainer bottom='15%' right='0%' z='1'>
            <Image
              src={foundProductInformation && foundProductInformation.image}
            />
          </ImageContainer>
          <ProductRating>
            {foundProductInformation && (
              <ReactStars
                count={5}
                value={foundProductInformation.rating}
                size={24}
                activeColor='#ffd700'
                edit={false}
              />
            )}
          </ProductRating>
      </Section>
      <Section divider>
        <Information>
          <Row onClick={() => setOpenReviews(!openReviews)}>
            <RowText>Reviews {reviews && reviews.list?.length}</RowText>
            {!openReviews ? (
              <OpenButton fontSize='large' />
            ) : (
              <CloseButton fontSize='large' />
            )}
          </Row>
          {openReviews && (
            <ReviewsContainer height='25rem'>
            {fetchProductReviewsError && <Error>{fetchProductReviewsError}</Error>}
              <Reviews scroll gap='.5rem'>
                {!reviews?.list?.length && <RowText>No Reviews</RowText>}
                {reviews?.list &&
                  reviews.list.map((review) => {
                    return (
                      <Row responsive key={review._id}>
                        <ReactStars
                          count={5}
                          value={review.rating}
                          size={24}
                          activeColor='#ffd700'
                        />
                        <RowText>{review.description}</RowText>
                      </Row>
                    )
                  })}
              </Reviews>
              <Dialog open={openReviewForm} onClose={closeReviewForm}>
                <ReviewForm onSubmit={handleSubmitReview}>
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor='#ffd700'
                  />
                  <TextArea
                    rows='4'
                    cols='50'
                    type='text'
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder='write review..'
                  />
                  <Button type='submit'>SUBMIT REVIEW</Button>
                </ReviewForm>
              </Dialog>
              {!userInfo ? (
                <RowText>Please login to write a review</RowText>
              ) : (
                userInfo &&
                hasReviewed && (
                  <RowText>Cannot write more than one review</RowText>
                )
              )}
              {userInfo && !hasReviewed && (
                <Button onClick={() => setOpenReviewForm(true)}>
                  ADD REVIEW
                </Button>
              )}
            </ReviewsContainer>
          )}
          <Row>
            <RowText>Stock</RowText>
            <RowText>
              {foundProductInformation?.quantity > 0
                ? 'In stock'
                : 'Out of stock'}
            </RowText>
          </Row>
          <Row onClick={() => setOpenDescription(!openDescription)}>
            <RowText>Description</RowText>
            {!openDescription ? (
              <OpenButton fontSize='large' />
            ) : (
              <CloseButton fontSize='large' />
            )}
          </Row>
          {openDescription && (
            <DescriptionContainer height='10rem'>
              <Description>
                {foundProductInformation && foundProductInformation.description}
              </Description>
            </DescriptionContainer>
          )}
        </Information>
        <Heading>
          Similar products
        </Heading>
        <SimilarProducts>
        {fetchSimilarProductsError && <Error>{fetchSimilarProductsError}</Error>}
        {similarProducts?.length &&
          <AutoPlaySwipeableViews slideClassName='item-suggestions-carousel'>
              {similarProducts.map((product) => {
                return (
                  <Link key={product._id} to={`/product/${product._id}`}>
                    <SimilarImage src={product.image} />
                  </Link>
                )
              })}
          </AutoPlaySwipeableViews>
        }
        </SimilarProducts>
        <ButtonContainer>
          {foundProductInformation?.quantity > 0 ? (
            <Button onClick={handleClickAddItemToCart('success')}>
              ADD TO CART
            </Button>
          ) : (
            <OutOfStock as='p' disabled>OUT OF STOCK</OutOfStock>
          )}
        </ButtonContainer>
      </Section>
    </View>
  )
}

const ButtonContainer = styled.div`
  margin: auto;
  display: flex;
  flex: 1;
  padding-bottom: 2rem;
  button {
    width: 25rem;
  }
`
const OpenButton = styled(ExpandCircleDownOutlinedIcon)`
  &:hover {
    cursor: pointer;
  }
`
const CloseButton = styled(ExpandLessOutlinedIcon)`
  &:hover {
    cursor: pointer;
  }
`
const DropDownContainer = styled.div`
display: flex;
flex-direction: column;
height: ${props => props.height};
width: 100%;
overflow-y: scroll;
`
const ReviewsContainer = styled(DropDownContainer)``
const DescriptionContainer = styled(DropDownContainer)``

const Reviews = styled(List)``

const Name = styled(Absolute)`
font-size: 4rem;
font-weight: 700;
font-family: 'Roboto', sans-serif;
overflow-wrap: break-word;
color: rgb(214, 175, 1);
`
const Price = styled(Absolute)`
padding: 0.5rem 0.8rem;
border-radius: 1rem;
font-family: 'Roboto', sans-serif;
overflow-wrap: break-word;
color: white;
background-color: rgba(94, 94, 94, 0.945);
`
const Image = styled.img``;
const ImageContainer = styled(Absolute)``;
const Information = styled(List)`
  flex: 1.2;
  margin: auto;
  margin-bottom: 0;
  text-align: center;
`;
const Description = styled.p``;

const ProductRating = styled.div`
  position: absolute;
  top: 5%;
  left: 7%;
`;
const ReviewForm = styled(Form)`
  padding: 2rem;
  justify-content: center;
  align-items: center;
`;
const SimilarProducts = styled.div`
  flex: 1;
  height: 18rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(212, 212, 212, 0.185);
  @media (min-width: 500px) {
    height: 18rem;
    width: 100%;
  }
`;
const SimilarImage = styled.img`
  height: 16rem;
  width: 13rem;
  background-image: url(${cardBackgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0.2rem;
  display: flex;
  justify-self: center;
  margin: auto;
  @media (min-width: 500px) {
    height: 16rem;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-left: -1rem;
  }
`;

const OutOfStock = styled(Button)`
background-color: transparent;
box-shadow: none;
&:hover {
  cursor: none;
}
`


