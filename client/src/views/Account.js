import React from 'react'
import { ViewResponsive } from '../components/View'
import styled from 'styled-components'
import accountImg from '../assets/greyscale_mountains.jpg'


export default function Account() {
  return (
    <ViewResponsive imageUrl={process.env.PUBLIC_URL + accountImg}>
      <Text>Shipping address</Text>
      <Text>Cart</Text>
      <Text>Logout</Text>
    </ViewResponsive>
  )
}

const Text = styled.h2`
color: rgba(255, 235, 148, 0.945);
font-size: 1.7rem;
text-align: center;
align-self: center;
justify-self: center;
`
