import styled from 'styled-components'
import cardBackgroundImg from '../assets/donught_corner_img.jpg'
import { Link } from 'react-router-dom'

const Container = styled(Link)`
background-image: url(${cardBackgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 80%;
  height: 22rem;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  margin: 1rem .4rem;
  border-radius: 0.5rem;
  position: relative;
  z-index: 4;
  background-color: rgba(214, 214, 214, 0.137);
  background-blend-mode: hue;
  box-shadow: 0px 13px 11px -5px rgba(0,0,0,0.17);
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
`

const Title = styled.h1`
 color: rgb(207, 159, 0);
  font-size: 3rem;
  line-height: 2.7rem;
  padding-left: .5rem;
  width: 90%;
  align-self: center;
  z-index: 2;
  position: absolute;
  bottom: 10%;
  font-family: 'Roboto', sans-serif;
  overflow-wrap: break-word;
`

const Price = styled.p`
font-weight: 700;
  font-style: bold;
  font-size: 1.2rem;
  margin-left: 1rem;
  margin-right: auto;
  padding: .2rem .8rem;
  color: white;
  border-radius: 2rem;
  background-color: rgba(82, 81, 81, 0.788);
  max-width: 100%;
`
const Image = styled.img`
width: 60%;
  height: 100%;
  align-self: flex-end;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
  background-color: transparent;
`
const Rating = styled.div`
position: absolute;
  top: 1%;
  width: 10rem;
  left: 5%;
  padding: 0;
  margin: auto;
  z-index: 6;
`
const NoRating = styled.p`
color: #777;
margin: 0%;
`
const Card = {
  Container,
  Title,
  Price,
  Image,
  Rating,
  NoRating
}

export default Card