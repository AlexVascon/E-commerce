import React from 'react'
import { View } from '../components/View'
import portalImg from '../assets/greyscale_mountains.jpg'
import { Form, Input } from '../components/Form'
import { Button } from '../components/Button'
import styled from 'styled-components'

export default function Portal() {
  return (
    <View imageUrl={process.env.PUBLIC_URL + portalImg} >
    <Form>
    <Options>
      <Btn>Login</Btn>
      /
      <Btn>Register</Btn>
    </Options>
      <Input type='text' placeholder='Username' />
      <Input type='email' placeholder='Email' />
      <Input type='password' placeholder='Password' />
      <Input type='password' placeholder='Confirm password' />
      <Button light={true} type='submit'>REGISTER</Button>
    </Form>
    </View>
  )
}

const Btn = styled.button`
border: none;
background-color: none;
background: none;
color: white;
font-weight: 600;
`

const Options = styled.div`
background-color: none;
  display: flex;
  width: 80%;
  padding: 1rem 0;
  color: white;
`