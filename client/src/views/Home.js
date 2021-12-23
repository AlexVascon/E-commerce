import React from 'react'
import {Link} from 'react-router-dom'
import { Image } from '../components/Image'
import { ViewResponsive, SectionResponsive } from '../components/View'
import styled from 'styled-components'
import MenImg from '../assets/ruthson-zimmerman-hDANeGXvWRw-unsplash.jpg'
import WomenImg from '../assets/zeny-rosalina-Z3tc0Bfv0c4-unsplash.jpg'


export default function Home() {
  return (
      <ViewResponsive >
      <SectionResponsive>
        <Image imageUrl={process.env.PUBLIC_URL + MenImg} >
        <Text to='/selection/men'>Men</Text>
        </Image>
        <Image imageUrl={process.env.PUBLIC_URL + WomenImg}>
        <Text to='/selection/women'>Women</Text>
        </Image>
       </SectionResponsive>
      </ViewResponsive>
  )
}

const Text = styled(Link)`
width: 15rem;
padding: .5rem 0;
border: 3px solid white;
color: white;
text-align: center;
justify-self: center;
font-weight: 700;
font-size: 4rem;
text-decoration: none;
`
