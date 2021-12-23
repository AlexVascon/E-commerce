import styled from "styled-components";
import cardBackgroundImg from '../assets/donught_corner_img.jpg'

// **big file moved styling into seperate component**
const List = styled.section`
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  flex: 2;
  @media (min-width: 750px) {
  position: absolute;
  left: 0%;
  width: 25rem;
  top: 8%;
  bottom: 5%;
}
@media (min-width: 850px) {
  left: 0%;
  width: 30rem;
}
@media (min-width: 950px) {
  left: 5%;
  width: 30rem;
}

@media (min-width: 1350px) {
  left: 20%;
  width: 30rem;
}
`
const Item = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  margin: auto;
  width: 90%;
  box-shadow: 0px 13px 11px -5px rgba(0, 0, 0, 0.17);
`
const Image = styled.img`
  width: 50%;
  object-position: 50%;
`

const ImageContainer = styled.div`
  flex: 2;
  height: 10rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-image: url(${cardBackgroundImg});
  background-size: contain;
  background-repeat: no-repeat;
`

const DescriptionContainer = styled.div`
position: relative;
flex: 3;
`
const Title = styled.h4`
position: absolute;
  bottom: 40%;
  color: rgba(235, 198, 36, 0.945);
  font-weight: 700;
  font-size: 1.2rem;
  margin: 0;
  padding: 0;
`
const Price = styled.h4`
position: absolute;
  bottom: 10%;
  color: white;
  text-align: center;
  width: 4rem;
  border-radius: 1rem;
  padding: .2rem .1rem;
  margin: 0;
  background-color: rgba(29, 29, 29, 0.527);
`

const EditContainer = styled.div`
flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: center;
  border-left: 1.8px solid rgba(204, 203, 203, 0.432);
`
const Button = styled.button`
 flex: 2;
  background: none;
  font-size: 2rem;
  border: none;
  color: rgba(94, 94, 94, 0.637);
`
const Quantity = styled.h4`
  flex: 1;
  margin: 0;
  color: rgba(235, 198, 36, 0.945);
`
const CostList = styled.ul`
flex: 1;
margin: auto;
margin-top: 1rem;
justify-content: center;
align-items: center;
text-align: center;
padding: 0;
width: 100%;
@media (min-width: 750px) {
  position: absolute;
  right: 2%;
  width: 22rem;
  top: 8%;
  bottom: 5%;
}
@media (min-width: 850px) {
  right: 0%;
  width: 25rem;
}
@media (min-width: 950px) {
  right: 4%;
  width: 27rem;
}

@media (min-width: 1250px) {
  right: 15%;
  width: 27rem;
}
`
const CostRow = styled.li`
width: 90%;
margin: auto;
display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(128, 128, 128, 0.363);
`
const RowText = styled.p`
margin-top: .5rem;
  margin-bottom: .5rem;
`

const CartItem = {
  List,
  Item,
  Image,
  ImageContainer,
  DescriptionContainer,
  Title,
  Price,
  EditContainer,
  Button,
  CostList,
  CostRow,
  RowText,
  Quantity
}

export default CartItem
