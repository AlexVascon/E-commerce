import React from 'react'
import { ViewResponsive, Section, List, Row, RowText } from '../components/View'
import {Button} from '../components/Button'
import productImg from '../assets/fade_item_background.jpg'
import styled from 'styled-components'

export default function Product() {
  return (
    <ViewResponsive>
      <Section imageUrl={process.env.PUBLIC_URL + productImg}>
      <Display>
      <Title>Title</Title>
      <Price>$40</Price>
      <ImageContainer>
        <Image />
      </ImageContainer>
      </Display>
      </Section>
      <Section>
        <List>
          <Row>
          <RowText>Review</RowText>
          <RowText>Show</RowText>
          </Row>
          <Row>
          <RowText>Stock</RowText>
          <RowText>In Stock</RowText>
          </Row>
          <Row>
          <RowText>Description</RowText>
          <RowText>Show</RowText>
          </Row>
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

const Image = styled.img``
const ImageContainer = styled.div`
position: absolute;
  bottom: 15%;
  right: 0%;
  z-index: 0;
`


