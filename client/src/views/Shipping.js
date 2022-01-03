import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  saveShippingInformation,
  fetchShippingInformation,
} from '../actions/userActions'
import {
  View,
  Button,
  Error,
  LoadingSpinner,
  Heading,
  Message,
} from '../components/MyLibrary'
import shippingImg from '../assets/cloudy_mountain_DARK.jpg'
import { Form, FormGroup, Input } from '../components/Form'

export default function Shipping() {
  const dispatch = useDispatch()
  const {
    saveShippingInformationError,
    loadingSaveShipping,
    saveShippingInformationSuccess,
  } = useSelector((state) => state.saveShippingInformation)
  const { shippingInformation } = useSelector(
    (state) => state.fetchShippingInformation
  )
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [province, setProvince] = useState('')
  const [postCode, setPostCode] = useState('')
  const [streetAddress, setStreetAddress] = useState('')

  const handleFullNameChange = (e) => setFullName(e.target.value)
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleCountryChange = (e) => setCountry(e.target.value)
  const handleCityChange = (e) => setCity(e.target.value)
  const handleProvinceChange = (e) => setProvince(e.target.value)
  const handlePostCodeChange = (e) => setPostCode(e.target.value)
  const handleStreetAddressChange = (e) => setStreetAddress(e.target.value)

  const onShippingAddressSubmit = (e) => {
    e.preventDefault()
    const shippingInformation = {
      fullName,
      phoneNumber,
      email,
      country,
      city,
      province,
      postCode,
      streetAddress,
    }
    dispatch(saveShippingInformation(shippingInformation))
  }

  useEffect(() => {
    dispatch(fetchShippingInformation())
  }, [dispatch])

  useEffect(() => {
    if (shippingInformation) {
      setFullName(shippingInformation.fullName)
      setPhoneNumber(shippingInformation.phoneNumber)
      setEmail(shippingInformation.email)
      setCountry(shippingInformation.country)
      setCity(shippingInformation.city)
      setProvince(shippingInformation.province)
      setPostCode(shippingInformation.postCode)
      setStreetAddress(shippingInformation.streetAddress)
    }
  }, [shippingInformation])

  return (
    <View imageUrl={process.env.PUBLIC_URL + shippingImg}>
      <Heading>Shipping Information</Heading>
      {loadingSaveShipping && <LoadingSpinner />}
      {saveShippingInformationSuccess && (
        <Message top='0%' bottom='0%'>
          Shipping information saved!
        </Message>
      )}
      {saveShippingInformationError && (
        <Error top='0%' bottom='0%'>
          {saveShippingInformationError}
        </Error>
      )}
      {shippingInformation ? (
        <Form onSubmit={onShippingAddressSubmit}>
          <Input type='text' value={fullName} onChange={handleFullNameChange} />
          <Input
            type='text'
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <Input type='email' value={email} onChange={handleEmailChange} />
          <FormGroup>
            <Input type='text' value={country} onChange={handleCountryChange} />
            <Input type='text' value={city} onChange={handleCityChange} />
          </FormGroup>
          <FormGroup>
            <Input
              type='text'
              value={province}
              onChange={handleProvinceChange}
            />
            <Input
              type='text'
              value={postCode}
              onChange={handlePostCodeChange}
            />
          </FormGroup>
          <Input
            type='text'
            value={streetAddress}
            onChange={handleStreetAddressChange}
          />
          <Button light type='submit'>
            SAVE
          </Button>
        </Form>
      ) : (
        <Form onSubmit={onShippingAddressSubmit}>
          <Input
            type='text'
            placeholder='Full name'
            onChange={handleFullNameChange}
          />
          <Input
            type='text'
            placeholder='Phone number'
            onChange={handlePhoneNumberChange}
          />
          <Input
            type='email'
            placeholder='Email'
            onChange={handleEmailChange}
          />
          <FormGroup>
            <Input
              type='text'
              placeholder='Country'
              onChange={handleCountryChange}
            />
            <Input type='text' placeholder='City' onChange={handleCityChange} />
          </FormGroup>
          <FormGroup>
            <Input
              type='text'
              placeholder='Province'
              onChange={handleProvinceChange}
            />
            <Input
              type='text'
              placeholder='Post code'
              onChange={handlePostCodeChange}
            />
          </FormGroup>
          <Input
            type='text'
            placeholder='Street Address'
            onChange={handleStreetAddressChange}
          />
          <Button light type='submit'>
            SAVE
          </Button>
        </Form>
      )}
    </View>
  )
}
