import React from 'react'
import { View } from '../components/View'
import styled from 'styled-components'
import CartItem from '../components/CartItem'
import { Button } from '../components/Button'

export default function Cart() {
  return (
    <View>
      <Title>SHOPPING CART</Title>
      <CartItem.List>
        <CartItem.Item>
          <CartItem.ImageContainer>
            <CartItem.Image />
          </CartItem.ImageContainer>
          <CartItem.DescriptionContainer>
            <CartItem.Title>Title</CartItem.Title>
            <CartItem.Price>$20</CartItem.Price>
          </CartItem.DescriptionContainer>
          <CartItem.EditContainer>
            <CartItem.Button>+</CartItem.Button>
            <CartItem.Button>-</CartItem.Button>
          </CartItem.EditContainer>
        </CartItem.Item>
      </CartItem.List>
      <CartItem.CostList>
        <CartItem.CostRow>
          <CartItem.RowText>Total</CartItem.RowText>
          <CartItem.RowText>$40</CartItem.RowText>
        </CartItem.CostRow>
        <CartItem.CostRow>
          <CartItem.RowText>Taxes</CartItem.RowText>
          <CartItem.RowText>$40</CartItem.RowText>
        </CartItem.CostRow>
        <CartItem.CostRow>
          <CartItem.RowText>Delivery</CartItem.RowText>
          <CartItem.RowText>Show</CartItem.RowText>
        </CartItem.CostRow>
        <Button>CHECKOUT</Button>
      </CartItem.CostList>
    </View>
  );
}

const Title = styled.h1`
  width: 100%;
  text-align: left;
  padding-left: 1.5rem;
  font-weight: 700;
  color: rgba(235, 198, 36, 0.945);
  font-size: 1rem;
`
