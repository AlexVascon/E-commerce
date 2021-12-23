import React from 'react'
import { ViewResponsive } from '../components/View'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import accountImg from '../assets/greyscale_mountains.jpg'


export default function Account() {
  return (
    <ViewResponsive imageUrl={process.env.PUBLIC_URL + accountImg}>
      <Text to='/shipping'>Shipping address</Text>
      <Text to='/cart'>Cart</Text>
      <Text to='/logout'>Logout</Text>
    </ViewResponsive>
  )
}

const Text = styled(Link)`
color: rgba(255, 235, 148, 0.945);
font-size: 2rem;
font-weight: bold;
text-align: center;
align-self: center;
justify-self: center;
text-decoration: none;
align-self: center;
margin: auto;
`
