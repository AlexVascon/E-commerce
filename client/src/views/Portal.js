import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, login } from '../actions/userActions'
import { View, Button, Error, LoadingSpinner, Heading } from '../components/MyLibrary'
import portalImg from '../assets/greyscale_mountains_DARK.jpg'
import { Form, Input } from '../components/Form'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

export default function Portal() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { registerError, registeredUser, registerLoading } = useSelector((state) => state.register)
  const { loggedUser, loginError, loadingLogin } = useSelector((state) => state.login)
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
    if (loggedUser || registeredUser) navigate('/account')
  }, [loggedUser, registeredUser, navigate])

  return (
    <View imageUrl={process.env.PUBLIC_URL + portalImg}>
    <Heading>Portal</Heading>
    {registerLoading && <LoadingSpinner />}
    {loadingLogin && <LoadingSpinner />}
    {loginError && isLogin && <Error bottom='5%' top='0%'>{loginError}</Error>}
    {registerError && !isLogin && <Error bottom='0%' top='0%'>{registerError}</Error>}
      <Options>
        <Btn onClick={() => setIsLogin(true)}>Login</Btn>/
        <Btn onClick={() => setIsLogin(false)}>Register</Btn>
      </Options>
      {isLogin ? (
        <PortalForm onSubmit={handleLoginSubmit}>
          <Input
            type='text'
            placeholder='Type username or email'
            onChange={handleUsernameOrEmailChange}
          />
          <Input
            type='password'
            placeholder='Password'
            onChange={handlePasswordChange}
          />
          <Button light type='submit'>
            LOGIN
          </Button>
        </PortalForm>
      ) : (
        <PortalForm onSubmit={handleRegisterSubmit}>
          <Input
            type='text'
            placeholder='Username'
            onChange={handleUsernameChange}
          />
          <Input
            type='email'
            placeholder='Email'
            onChange={handleEmailChange}
          />
          <Input
            type='password'
            placeholder='Password'
            onChange={handlePasswordChange}
          />
          <Input
            type='password'
            placeholder='Confirm password'
            onChange={handleConfirmPasswordChange}
          />
          <Button light type='submit'>
            REGISTER
          </Button>
        </PortalForm>
      )}
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
  width: 65%;
  padding: 0;
  color: white;
  justify-self: center;
  margin: auto;
  margin-bottom: 0;
  @media (min-width: 400px) {
    max-width: 25rem;
    button:hover {
      cursor: pointer;
    }
  }
`
const PortalForm = styled(Form)`
  margin-top: 1rem;
`
