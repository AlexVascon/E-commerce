import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTopProducts } from '../actions/productActions'
import { Link } from 'react-router-dom'
import { View, Heading, Section, Error, LoadingSpinner } from '../components/MyLibrary'
import styled from 'styled-components'
import MenImg from '../assets/men.jpg'
import WomenImg from '../assets/women.jpg'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import cardBackgroundImg from '../assets/donught_corner_img.jpg'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export default function Home() {
  const dispatch = useDispatch()
  const { topProducts, loadingFetchTopProducts, fetchTopProductsError } = useSelector((state) => state.fetchTopProducts)

  useEffect(() => {
    dispatch(fetchTopProducts())
  }, [dispatch])

  return (
    <View>
      <Section>
        <Images>
          <Men imageUrl={process.env.PUBLIC_URL + MenImg}>
            <Text to='/selection/men'>Men</Text>
          </Men>
          <Women imageUrl={process.env.PUBLIC_URL + WomenImg}>
            <Text to='/selection/women'>Women</Text>
          </Women>
        </Images>
        <Heading center size='1.5rem'>
          Top Products
        </Heading>
        <TopProducts>
        {loadingFetchTopProducts && <LoadingSpinner />}
        {fetchTopProductsError && <Error>{fetchTopProductsError}</Error>}
          {topProducts?.length && 
            <AutoPlaySwipeableViews slideClassName='item-suggestions-carousel'>
              {topProducts.map((product) => {
                return (
                  <Link key={product._id} to={`/product/${product._id}`}>
                    <TopProductImage src={product.image} />
                  </Link>
                )
              })}
            </AutoPlaySwipeableViews>
          }
        </TopProducts>
      </Section>
    </View>
  )
}

const Text = styled(Link)`
  width: 50%;
  padding: 0.5rem 0;
  border: 3px solid white;
  color: white;
  text-align: center;
  justify-self: center;
  font-weight: 700;
  font-size: 1.4rem;
  text-decoration: none;
`
const TopProducts = styled.section`
  flex: 1;
  flex-direction: row;
  height: 20rem;
  width: 100%;
  display: flex;
  background-image: url(${(props) => props.imageUrl});
  background-position-y: center;
  background-position-x: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: RGB(242, 242, 242);
`
const TopProductImage = styled.img`
  height: 18rem;
  width: 13rem;
  background-image: url(${cardBackgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 0 2rem;
  border-radius: 0.2rem;
  display: flex;
  justify-content: center;
`
const Image = styled.div`
  flex: 1;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.719);
  background-blend-mode: hue;
`
const Men = styled(Image)``
const Women = styled(Image)``

const Images = styled.div`
  flex: 1;
  display: flex;
`
