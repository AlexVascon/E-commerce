import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { saveShippingInformation, fetchShippingInformation } from '../actions/userActions'
import { View, Error } from '../components/View'
import shippingImg from '../assets/shipping_background.jpg'
import { Form, FormGroup, Input } from '../components/Form'
import { Button } from '../components/Button'

export default function Shipping() {
  const dispatch = useDispatch()
  const {saveShippingInformationError} = useSelector((state) => state.saveShippingInformation)
  const {shippingInformation} = useSelector((state) => state.fetchShippingInformation)
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
    e.preventDefault();
    const shippingInformation = {fullName, phoneNumber, email, country, city, province, postCode, streetAddress}
    dispatch(saveShippingInformation(shippingInformation))
  }

  useEffect(() => {
    dispatch(fetchShippingInformation())
  }, [dispatch])

  return (
    <View imageUrl={process.env.PUBLIC_URL + shippingImg}>
    {saveShippingInformationError && <Error>{saveShippingInformationError}</Error>}
      <Form onSubmit={onShippingAddressSubmit}>
        <Input type='text' placeholder={shippingInformation?.fullName || 'Full name'} onChange={handleFullNameChange} />
        <Input type='text' placeholder={shippingInformation?.phoneNumber || 'Phone number'} onChange={handlePhoneNumberChange} />
        <Input type='email' placeholder={shippingInformation?.email || 'email'} onChange={handleEmailChange} />
        <FormGroup>
          <Input type='text' placeholder={shippingInformation?.country || 'country'} onChange={handleCountryChange} />
          <Input type='text' placeholder={shippingInformation?.city || 'city'} onChange={handleCityChange} />
        </FormGroup>
        <FormGroup>
          <Input type='text' placeholder={shippingInformation?.province || 'province'} onChange={handleProvinceChange} />
          <Input type='text' placeholder={shippingInformation?.postCode || 'post code'} onChange={handlePostCodeChange} />
        </FormGroup>
        <Input type='text' placeholder={shippingInformation?.streetAddress || 'streetAddress'} onChange={handleStreetAddressChange} />
        <Button light={true} type='submit'>
          SAVE
        </Button>
      </Form>
    </View>
  )
}
