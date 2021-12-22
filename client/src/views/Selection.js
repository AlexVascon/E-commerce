import React from 'react'
import { Image } from '../components/Image'
import {View, Section} from '../components/View'
import MenImg from '../assets/ruthson-zimmerman-hDANeGXvWRw-unsplash.jpg'
import WomenImg from '../assets/zeny-rosalina-Z3tc0Bfv0c4-unsplash.jpg'
import styled from 'styled-components'
import Card from '../components/Card'


export default function Selection() {

  return (
    <View>
    <Section>
      <Image imageUrl={process.env.PUBLIC_URL + WomenImg}>
      <Categories>
        <List>SHIRT</List>
        <List>JUMPER</List>
        <List>SUIT</List>
      </Categories>
      </Image>
    </Section>
    <Section>
    <SelectionItems>
    <Card.Container>
      <Card.Title>Title</Card.Title>
      <Card.Price>$20</Card.Price>
    </Card.Container>
    </SelectionItems>
    </Section>
    </View>
  )
}

const Categories = styled.div`
display: flex;
color: rgba(255, 246, 189, 0.822);
background-color: rgba(0, 0, 0, 0.219);
width: 100vw;
justify-content: center;
gap: 3rem;
`

const List = styled.ul`
display: flex;
list-style-type: none;
padding: 0;
`

const SelectionItems = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
gap: 0;
width: 100%;
height: 90%;
overflow-y: scroll;
background-color: white;
`
