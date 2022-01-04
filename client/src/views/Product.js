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
import {
  addItemToCart,
  addCartItemToAnonymous,
  fetchCartItems,
} from '../actions/cartActions'
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
  LoadingSpinner,
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
  const { reviewSuccess, createProductReviewError } = useSelector(
    (state) => state.createProductReview
  )
  const { reviews, fetchProductReviewsError } = useSelector(
    (state) => state.fetchProductReviews
  )
  const {
    foundProductInformation,
    fetchProductInformationError,
    fetchProductInformationLoading,
  } = useSelector((state) => state.fetchProductInformation)
  const { similarProducts, fetchSimilarProductsError } = useSelector(
    (state) => state.fetchSimilarProducts
  )
  const { userInfo } = useSelector((state) => state.authenticate)
  const { cart } = useSelector((state) => state.fetchCartItems)
  const { enqueueSnackbar } = useSnackbar()
  const [openDescription, setOpenDescription] = useState(false)
  const [openReviews, setOpenReviews] = useState(false)
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const [hasReviewed, setHasReviewed] = useState(false)
  const [openReviewForm, setOpenReviewForm] = useState(false)
  const [cartQuantity, setCartQuantity] = useState(0)

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchProductInformation(productId))
    dispatch(fetchSimilarProducts(productId))
    dispatch(fetchProductReviews(productId))
  }, [dispatch, productId])

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  useEffect(() => {
    if (cart) {
      const itemInCart = cart.items.filter(
        (item) => item.itemId === productId
      )[0]
      if (itemInCart) setCartQuantity(itemInCart.quantity)
    }
  }, [cart, productId])

  useEffect(() => {
    if (reviews && userInfo) {
      const { _id } = userInfo
      const userReview = reviews.reviews.filter(
        (review) => review.userId === _id
      )
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
    setCartQuantity((quantity) => quantity + 1)
  }

  return (
    <View responsive>
      {fetchProductInformationLoading && <LoadingSpinner size='15rem' />}
      {fetchProductInformationError && (
        <Error>{fetchProductInformationError}</Error>
      )}
      <Section>
        {foundProductInformation && (
          <Card>
            <Rating as='span' width='10rem' top='1%' left='8%' z='6'>
              <ReactStars
                count={5}
                value={foundProductInformation.rating || 0}
                size={25}
                activeColor='#ffd700'
                edit={false}
              />
            </Rating>
            <Image
              as='img'
              width='60%'
              z='1'
              src={foundProductInformation.image}
            />
            <Name as='b' width='90%' bottom='0%' left='5%' z='2'>
              {foundProductInformation.title}
            </Name>
            <Price as='span' width='20%' top='7%' left='5%'>
              ${foundProductInformation.price}
            </Price>
          </Card>
        )}
      </Section>
      <Section divider>
        <Information>
          <Row onClick={() => setOpenReviews(!openReviews)}>
            <RowText>
              Reviews {reviews && reviews.reviews && reviews.reviews.length}
            </RowText>
            {!openReviews ? (
              <OpenButton fontSize='large' />
            ) : (
              <CloseButton fontSize='large' />
            )}
          </Row>
          {openReviews && (
            <ReviewsContainer height='25rem'>
              {fetchProductReviewsError && (
                <Error>{fetchProductReviewsError}</Error>
              )}
              <Reviews scroll gap='.5rem'>
                {!reviews && !reviews.reviews.length && (
                  <RowText>No Reviews</RowText>
                )}
                {reviews &&
                  reviews.reviews &&
                  reviews.reviews.map((review) => {
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
                {createProductReviewError && (
                  <Error>{createProductReviewError}</Error>
                )}
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
        <Heading>Similar products</Heading>
        <SimilarProducts>
          {fetchSimilarProductsError && (
            <Error>{fetchSimilarProductsError}</Error>
          )}
          {similarProducts?.length && (
            <AutoPlaySwipeableViews slideClassName='item-suggestions-carousel'>
              {similarProducts.map((product) => {
                return (
                  <Link key={product._id} to={`/product/${product._id}`}>
                    <SimilarImage src={product.image} />
                  </Link>
                )
              })}
            </AutoPlaySwipeableViews>
          )}
        </SimilarProducts>
        <ButtonContainer>
          {foundProductInformation?.quantity > 0 &&
            cartQuantity < foundProductInformation?.quantity && (
              <Button onClick={handleClickAddItemToCart('success')}>
                ADD TO CART
              </Button>
            )}
          {foundProductInformation?.quantity > 0 &&
            cartQuantity >= foundProductInformation?.quantity && (
              <Button disable>ADD TO CART</Button>
            )}
          {foundProductInformation?.quantity === 0 && (
            <OutOfStock as='p' disabled>
              OUT OF STOCK
            </OutOfStock>
          )}
        </ButtonContainer>
      </Section>
    </View>
  )
}

const Card = styled.div`
  background-image: url(${productImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: center;
  width: 95%;
  height: 90vh;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin: 1rem 0.4rem;
  border-radius: 0.5rem;
  position: relative;
  z-index: 4;

  @media (min-width: 450px) {
  }
  @media (min-width: 550px) {
    margin: 1rem;
  }
  @media (min-width: 750px) {
    margin: 1rem;
  }
`
const Name = styled(Absolute)`
  font-size: 3rem;
  font-family: 'Roboto', sans-serif;
  overflow-wrap: break-word;
  line-height: 2.7rem;
  color: rgb(207, 159, 0);
`
const Price = styled(Absolute)`
  font-size: 1.2rem;
  font-weight: 700;
  text-align: center;
  padding: 0.2rem 0.8rem;
  color: white;
  border-radius: 2rem;
  background-color: rgba(82, 81, 81, 0.788);
`
const Image = styled(Absolute)`
  height: 100%;
  align-self: flex-end;
  padding: 0;
  margin: 0;
  z-index: 1;
  background-color: transparent;
`
const Rating = styled(Absolute)``

// ---  --

const ButtonContainer = styled.div`
  margin: auto;
  display: flex;
  flex: 1;
  padding-bottom: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  button {
    max-width: 25rem;
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
  height: ${(props) => props.height};
  width: 100%;
  overflow-y: scroll;
`
const ReviewsContainer = styled(DropDownContainer)``
const DescriptionContainer = styled(DropDownContainer)``

const Reviews = styled(List)``

const Information = styled(List)`
  flex: 1.2;
  margin: auto;
  margin-bottom: 0;
  text-align: center;
`
const Description = styled.p``

const ReviewForm = styled(Form)`
  padding: 1rem;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  @media (min-width: 415px) {
    padding: 4rem;
  }
`
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
`
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
`

const OutOfStock = styled(Button)`
  text-align: center;
  background-color: transparent;
  box-shadow: none;
  &:hover {
    cursor: none;
  }
`
