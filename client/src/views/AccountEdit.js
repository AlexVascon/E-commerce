import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate, userEdit } from '../actions/userActions'
import { Button } from '../components/MyLibrary'
import { Form, Input } from '../components/Form'
import { View, Error, Heading, LoadingSpinner, Message } from '../components/MyLibrary'
import accountImg from '../assets/greyscale_mountains_DARK.jpg'

export default function AccountEdit() {
  const dispatch = useDispatch()
  const {userInfo} = useSelector((state) => state.authenticate)
  const {editUserSuccess, editUserError, loadingEditUser} = useSelector((state) => state.editUser)
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

  useEffect(() => {
    if(userInfo) {
      setUsername(userInfo.username)
      setEmail(userInfo.email)
      setPassword(userInfo.password)
    }
  }, [userInfo])

  const handleSubmit = (e) => {
    e.preventDefault()
    const body = {username, email, password, confirmPassword}
    dispatch(userEdit(body))
  }
  return (
    <View imageUrl={accountImg}>
    <Heading>Edit account</Heading>
    {loadingEditUser && <LoadingSpinner />}
    {editUserSuccess && <Message top='0%' bottom='0%'>Information updated!</Message>}
    {editUserError && <Error top='0%' bottom='0%'>{editUserError}</Error>}
      {userInfo && 
      <Form onSubmit={handleSubmit}>
        <Input type='text' value={username} onChange={handleUsernameChange} />
        <Input type='email' value={email} onChange={handleEmailChange} />
        <Input type='password' placeholder='Type new password' onChange={handlePasswordChange} />
        <Input type='password' placeholder='Confirm new password' onChange={handleConfirmPasswordChange} />
        <Button light type='submit' >CONFIRM EDIT</Button>
      </Form>
      }
    </View>
  )
}

