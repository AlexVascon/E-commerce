import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../actions/userActions'
import { logout } from '../actions/userActions'
import { View } from '../components/MyLibrary'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import accountImg from '../assets/greyscale_mountains_DARK.jpg'

export default function Account() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.authenticate)
  const [user, setUser] = useState(undefined)

  // get auth
  useEffect(() => {
    if (!user) dispatch(authenticate())
  }, [dispatch, user])

  // set auth
  useEffect(() => {
    if (userInfo) setUser(userInfo)
  }, [userInfo])

  return (
    <View responsive imageUrl={process.env.PUBLIC_URL + accountImg}>
      <LinkText to='/shipping'>Shipping address</LinkText>
      <LinkText to='/cart'>Cart</LinkText>
      <LinkText to='/my-orders'>My orders</LinkText>
      {user?.isAdmin && <LinkText to='/admin/order/all'>Orders</LinkText>}
      {user?.isAdmin && <LinkText to='/admin/product/all'>Products</LinkText>}
      {user?.isAdmin && <LinkText to='/admin/user/all'>Users</LinkText>}
      <LinkText to='/user/edit'>Edit account</LinkText>
      <Text
        onClick={() => {
          dispatch(logout())
          navigate('/portal')
        }}
      >
        Logout
      </Text>
    </View>
  )
}

const LinkText = styled(Link)`
  color: rgba(255, 235, 148, 0.945);
  font-size: 2rem;
  text-align: center;
  align-self: center;
  justify-self: center;
  text-decoration: none;
  align-self: center;
  margin: auto;
  &:hover {
    cursor: pointer;
    text-shadow: 0 -1px 4px #ff0, 0 -2px 10px #ff0, 0px 0px 20px #ff0;
  }
  @media (min-width: 600px) {
    font-size: 1rem;
  }
`
const Text = styled.p`
  color: rgba(255, 235, 148, 0.945);
  font-size: 2rem;
  text-align: center;
  align-self: center;
  justify-self: center;
  text-decoration: none;
  align-self: center;
  margin: auto;
  &:hover {
    cursor: pointer;
    text-shadow: 0 -1px 4px #ff0, 0 -2px 10px #ff0, 0px 0px 20px #ff0;
  }
  @media (min-width: 600px) {
    font-size: 1rem;
  }
`
