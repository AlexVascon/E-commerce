import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { register, login } from '../actions/userActions'
import { View, Error } from '../components/View'
import portalImg from '../assets/greyscale_mountains.jpg'
import { Form, Input } from '../components/Form'
import { Button } from '../components/Button'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function Portal() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {registerError} = useSelector((state) => state.register)
  const { loggedUser} = useSelector((state) => state.login)
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameOrEmail, setUsernameOrEmail] = useState('')

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)
  const handleUsernameOrEmailChange = (e) => setUsernameOrEmail(e.target.value)

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    dispatch(register(username, email, password, confirmPassword))
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    dispatch(login(usernameOrEmail, password))
  }

  useEffect(() => {
    if(loggedUser) navigate('/account')
  }, [loggedUser, navigate])

  return (
    <View imageUrl={process.env.PUBLIC_URL + portalImg} >
     <Options>
      <Btn onClick={() => setIsLogin(true)}>Login</Btn>
      /
      <Btn onClick={() => setIsLogin(false)}>Register</Btn>
    </Options>
    {isLogin ?
      <Form onSubmit={handleLoginSubmit}>
    <Input type='text' placeholder='Type username or email' onChange={handleUsernameOrEmailChange} />
    <Input type='password' placeholder='Password' onChange={handlePasswordChange} />
    <Button light={true} type='submit'>LOGIN</Button>
    </Form>
    :
    <Form onSubmit={handleRegisterSubmit}>
    {registerError && <Error>{registerError}</Error>}
      <Input type='text' placeholder='Username' onChange={handleUsernameChange} />
      <Input type='email' placeholder='Email' onChange={handleEmailChange} />
      <Input type='password' placeholder='Password' onChange={handlePasswordChange} />
      <Input type='password' placeholder='Confirm password' onChange={handleConfirmPasswordChange} />
      <Button light={true} type='submit'>REGISTER</Button>
    </Form>
    }
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
  padding: 0;
  color: white;
  justify-self: center;
  align-self: center;
  margin: auto;
  margin-bottom: 0;
`
