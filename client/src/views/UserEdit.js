import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate, userEdit } from '../actions/userActions'
import { Button, SubTitle } from '../components/MyLibrary'
import { Form, Input } from '../components/Form'
import { View } from '../components/MyLibrary'
import accountImg from '../assets/greyscale_mountains_DARK.jpg'

export default function UserEdit() {
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state) => state.authenticate)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

  useEffect(() => {
    dispatch(authenticate())
  },[dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {username, email, password, confirmPassword}
    dispatch(userEdit(body))
  }
  return (
    <View imageUrl={accountImg}>
      {userInfo && 
      <Form onSubmit={handleSubmit}>
      <SubTitle>Edit Account</SubTitle>
        <Input type='text' placeholder={userInfo.username} onChange={handleUsernameChange} />
        <Input type='email' placeholder={userInfo.email} onChange={handleEmailChange} />
        <Input type='password' placeholder='Type new password' onChange={handlePasswordChange} />
        <Input type='password' placeholder='Confirm new password' onChange={handleConfirmPasswordChange} />
        <Button light type='submit' >CONFIRM EDIT</Button>
      </Form>
      }
    </View>
  )
}
