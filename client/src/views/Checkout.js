import React from 'react'
import { View } from '../components/View'
import { Elements, CardElement } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import styled from 'styled-components'

const PUBLIC_KEY = 'pk_test_51K0lRmC2ZHbTWgUUms603vE2wXs46t4H9SuriRnsBrajgFxs9UvOhy960P5mYXwpD34QHLHf81FSmoD9XOOPV9NU000WvKX0zP'


export default function Checkout() {
  
  return (
    <View>
      <Elements stripe={loadStripe(PUBLIC_KEY)} >
      <Disclaimer>Warning: Stripe payment is in test mode. None of the products are real. This is merely a project. If you wish to proceed simply type 242424 etc over and over in that order. I plan to add to this.</Disclaimer>
     <PaymentForm>
       <CardElement />
       <PayButton>Pay</PayButton>
     </PaymentForm>
      </Elements>
    </View>
  )
}

const Disclaimer = styled.p`
width: 80%;
border: 1px solid black;
border-radius: .3rem;
padding: 1rem;
justify-self: center;
margin: auto;
margin-bottom: 0;
@media (min-width: 550px) {
  max-width: 30rem;
}
`

const PaymentForm = styled.form`
width: 80%;
border-radius: .5rem;
padding: 1.2rem 1rem;
display: flex;
flex-direction: column;
justify-self: center;
margin: auto;
margin-top: 4rem;
gap: 1rem;
box-shadow: 0px 5px 5px #CCC;
@media (min-width: 550px) {
  max-width: 25rem;
}
`

const PayButton = styled.button`
background-color: black;
outline: none;
border: none;
padding: .3rem .7rem;
color: white;
border-radius: .8rem;
`
