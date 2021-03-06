import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCartItems,
  addItemToCart,
  removeFromCart,
} from '../actions/cartActions'
import {
  View,
  Heading,
  Container,
  List,
  Row,
  RowText,
  HoldImage,
  SubContainer,
  Button,
} from '../components/MyLibrary'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import cartImg from '../assets/cloudy_mountain_LIGHT.png'

export default function Cart() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.fetchCartItems)
  const [cartItems, setCartItems] = useState(null)
  const [totalPrice, setTotalPrice] = useState(null)

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  useEffect(() => {
    if (cart) {
      setCartItems(cart.items)
      setTotalPrice(cart.totalCost)
    }
  }, [cart])

  const updateItemQuantity = (amount, itemId, index) => {
    // for smoother user experience without constant screen flash on update
    let updatedCartItems = [...cartItems]
    updatedCartItems[index].quantity += amount
    if (amount > 0) {
      dispatch(addItemToCart(itemId))
      setTotalPrice(
        (totalPrice) => (totalPrice += updatedCartItems[index].price)
      )
    }
    if (amount < 0) {
      dispatch(removeFromCart(itemId))
      setTotalPrice(
        (totalPrice) => (totalPrice -= updatedCartItems[index].price)
      )
    }
    setCartItems(updatedCartItems)
  }

  return (
    <View responsive imageUrl={process.env.PUBLIC_URL + cartImg}>
      <Heading static top='1%' left='5%' size='1rem'>
        SHOPPING CART
      </Heading>
      <CartItems scroll gap='0.7rem'>
        {cartItems &&
          cartItems.map((item, index) => {
            return (
              <Item
                height='10rem'
                shadow
                background='white'
                width='90%'
                key={item.itemId}
              >
                <HoldImage background>
                  <img src={item.image} alt='' />
                </HoldImage>
                <Description flex='3' column>
                  <Name>{item.name}</Name>
                  <Price>${item.price}</Price>
                </Description>
                <Edit flex='1' column center>
                  {item.quantity !== item.stock ? (
                    <Increase
                      onClick={() => updateItemQuantity(1, item.itemId, index)}
                    >
                      +
                    </Increase>
                  ) : (
                    <Increase disabled>+</Increase>
                  )}
                  <Quantity>{item && item.quantity}</Quantity>
                  {item.quantity === 0 ? (
                    <Decrease disabled>-</Decrease>
                  ) : (
                    <Decrease
                      onClick={() => updateItemQuantity(-1, item.itemId, index)}
                    >
                      -
                    </Decrease>
                  )}
                </Edit>
              </Item>
            )
          })}
      </CartItems>
      <PricingInformation>
        <Row>
          <RowText>Total</RowText>
          <RowText>${totalPrice && totalPrice}</RowText>
        </Row>
        <Row>
          <RowText>Taxes</RowText>
          <RowText>${(cart && cart.taxPrice) || 0}</RowText>
        </Row>
        <Row>
          <RowText>Delivery</RowText>
          <RowText>Free</RowText>
        </Row>
        <ButtonContainer>
          {!cart?.items?.length ? (
            <Message as='p' disabled>
              NO ITEMS
            </Message>
          ) : (
            <Button light onClick={() => navigate('/checkout')}>
              CHECKOUT
            </Button>
          )}
        </ButtonContainer>
      </PricingInformation>
    </View>
  )
}

const CartItems = styled(List)`
  flex: 1.5;
  height: 90vh;
  margin-top: 3rem;
  @media (max-width: 600px) {
    max-height: 60vh;
  }
  overflow-y: scroll;
`
const PricingInformation = styled(List)`
  padding-bottom: 3rem;
`
const Item = styled(Container)``
const Description = styled(SubContainer)``
const Edit = styled(SubContainer)``

const Name = styled.b`
  font-size: 1.4rem;
  color: rgba(235, 198, 36, 0.945);
  margin: auto;
  margin-left: 0.5rem;
  padding-top: 3rem;
  overflow-wrap: break-word;
`
const Price = styled.span`
  color: white;
  text-align: center;
  width: 4rem;
  margin: auto;
  border-radius: 1rem;
  padding: 0.3rem 0;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: rgba(29, 29, 29, 0.527);
`
const ButtonContainer = styled.div`
  flex: 0.5;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0;
  padding-top: 0;
  text-align: center;
  button {
    max-width: 25rem;
  }
`
const EditButton = styled.button`
  flex: 2;
  background: none;
  font-size: 2rem;
  border: none;
  color: rgba(94, 94, 94, 0.637);
  &:hover {
    cursor: pointer;
  }
`
const Increase = styled(EditButton)``
const Decrease = styled(EditButton)``

const Quantity = styled.span`
  color: rgba(235, 198, 36, 0.945);
  font-weight: bold;
  font-size: 1.2rem;
`
const Message = styled(Button)`
  background-color: transparent;
  box-shadow: none;
`
