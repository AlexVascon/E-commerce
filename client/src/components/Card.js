import styled from 'styled-components'
import cardBackgroundImg from '../assets/donught_corner_img.jpg'

const Container = styled.div`
background-image: url(${cardBackgroundImg});
  background-size: cover;
  background-repeat: no-repeat;
  width: 9.5rem;
  display: flex;
  justify-content: flex-end;
  height: 12rem;
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
  font-size: 2rem;
  line-height: 1.8rem;
  padding-left: .5rem;
  width: 90%;
  align-self: center;
  z-index: 2;
  position: absolute;
  bottom: 10%;
  font-family: 'Roboto', sans-serif;
`

const Price = styled.p`
font-weight: 700;
  font-style: bold;
  font-size: .9rem;
  margin-left: .5rem;
  margin-right: auto;
  padding: .2rem .5rem;
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

const Card = {
  Container,
  Title,
  Price,
  Image
}

export default Card