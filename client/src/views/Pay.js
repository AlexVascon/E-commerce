import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrder, payOrder } from '../actions/orderActions'
import { View, Error, Row, RowText, Button } from '../components/MyLibrary'
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import paymentSuccessImg from '../assets/payment-success.png'

export default function Pay() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { foundOrder } = useSelector((state) => state.fetchOrder)
  const { payOrderError, payOrderSuccess, payOrderLoading } = useSelector(
    (state) => state.payOrder
  )
  const [open, setOpen] = useState(false)
  useEffect(() => {
    dispatch(fetchOrder(orderId))
  }, [dispatch, orderId])

  const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleCheckoutSubmit = async (e) => {
      e.preventDefault()
      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        })
        dispatch(payOrder(error, orderId, paymentMethod))
      } catch (err) {
        console.log(err)
      }
    }

    return (
      <PaymentContainer onSubmit={handleCheckoutSubmit}>
        <CardElement />
        <Row>
          <RowText>Shipping:</RowText>
          <RowText>Free</RowText>
        </Row>
        <Row>
          <RowText>Tax:</RowText>
          <RowText>${foundOrder && foundOrder.taxPrice}</RowText>
        </Row>
        <Row>
          <RowText>Total:</RowText>
          <RowText>
            ${foundOrder && foundOrder.totalPrice + foundOrder.taxPrice}
          </RowText>
        </Row>
        <PayButton type='submit'>Pay</PayButton>
      </PaymentContainer>
    )
  }

  useEffect(() => {
    if (payOrderSuccess) setOpen(true)
  }, [payOrderSuccess])

  const closeSuccessScreen = () => {
    setOpen(false)
    navigate('/account')
  }

  return (
    <View>
      <Elements stripe={loadStripe(process.env.PUBLIC_KEY)}>
        {payOrderError && <Error>{payOrderError}</Error>}
        <Disclaimer>
          Warning: Stripe payment is in test mode. None of the products are
          real. This is merely a project. If you wish to proceed simply type
          4242 etc over and over in that order. I plan to add to this.
        </Disclaimer>
        {payOrderLoading && (
          <ProcessingPayment>
            <RowText>Proccessing payment. This will take a moment.</RowText>
            <ProcessingSpinner />
          </ProcessingPayment>
        )}
        {foundOrder && <PaymentForm />}
      </Elements>
      <Dialog open={open} onClose={closeSuccessScreen}>
        <SuccessScreen>
          <SuccessImage src={paymentSuccessImg} />
          <b>Payment success</b>
          <p>Your order is being prepaird (not really)</p>
          <Button onClick={closeSuccessScreen}>Continue</Button>
        </SuccessScreen>
      </Dialog>
    </View>
  )
}

const Disclaimer = styled.p`
  width: 80%;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 1rem;
  justify-self: center;
  margin: auto;
  margin-bottom: 0;
  @media (min-width: 550px) {
    max-width: 30rem;
  }
`
const PaymentContainer = styled.form`
  width: 80%;
  border-radius: 0.5rem;
  padding: 1.2rem 1rem;
  display: flex;
  flex-direction: column;
  justify-self: center;
  margin: auto;
  margin-top: 4rem;
  gap: 1rem;
  box-shadow: 0px 5px 5px #ccc;
  @media (min-width: 550px) {
    max-width: 25rem;
  }
`
const PayButton = styled.button`
  background-color: black;
  outline: none;
  border: none;
  padding: 0.3rem 0.7rem;
  color: white;
  border-radius: 0.8rem;
  &:hover {
    cursor: pointer;
  }
`
const ProcessingPayment = styled.div`
  width: 80%;
  background-color: rgb(115, 161, 240);
  color: white;
  border: none;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  margin: auto;
  border-radius: 0.3rem;
  padding: 0.5rem 0;
  @media (min-width: 550px) {
    max-width: 30rem;
  }
`
const ProcessingSpinner = styled(CircularProgress)`
  justify-self: center;
  align-self: center;
`
const SuccessScreen = styled.div`
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 1.5rem;
  justify-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  border: none;
  margin: auto;
  margin-bottom: 0;
  @media (min-width: 550px) {
    max-width: 30rem;
  }
`
const SuccessImage = styled.img`
  width: 5rem;
  height: 5rem;
  background-color: transparent;
`
