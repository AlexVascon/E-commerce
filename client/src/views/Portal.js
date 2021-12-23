import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { register } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'
import { View, Error } from '../components/View'
import portalImg from '../assets/greyscale_mountains.jpg'
import { Form, Input } from '../components/Form'
import { Button } from '../components/Button'
import styled from 'styled-components'

export default function Portal() {
  const dispatch = useDispatch()
  const { registeredUser, registerError} = useSelector((state) => state.register)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    dispatch(register(username, email, password, confirmPassword))
  }

  useEffect(() => {
    if(registeredUser) navigate('/account')
  }, [registeredUser, navigate])

  return (
    <View imageUrl={process.env.PUBLIC_URL + portalImg} >
    <Form onSubmit={handleRegisterSubmit}>
    <Options>
      <Btn>Login</Btn>
      /
      <Btn>Register</Btn>
    </Options>
    {registerError && <Error>{registerError}</Error>}
      <Input type='text' placeholder='Username' onChange={handleUsernameChange} />
      <Input type='email' placeholder='Email' onChange={handleEmailChange} />
      <Input type='password' placeholder='Password' onChange={handlePasswordChange} />
      <Input type='password' placeholder='Confirm password' onChange={handleConfirmPasswordChange} />
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
