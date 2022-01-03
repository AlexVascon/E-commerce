import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems } from '../actions/cartActions'
import { authenticate } from '../actions/userActions'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import { NavLink, useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge'

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.fetchCartItems)
  const { userInfo } = useSelector((state) => state.authenticate)
  const [user, setUser] = useState(undefined)
  const [open, setOpen] = useState(false)

  const toggleNavMenu = (state) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpen(state)
  }

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  // get auth
  useEffect(() => {
    if (!user) dispatch(authenticate())
  }, [dispatch, user])

  // set auth
  useEffect(() => {
    if (userInfo) setUser(userInfo)
  }, [userInfo])

  return (
    <Nav>
      <HomeLink to='/'>Shop</HomeLink>
      <MobileMenuContainer>
        <MobileMenu fontSize='large' onClick={toggleNavMenu(true)} />
        <CartCounter
          badgeContent={cart && cart.items.length}
          onClick={() => navigate('/cart')}
        >
          <CartIcon color='white' />
        </CartCounter>
      </MobileMenuContainer>
      <Drawer anchor={'right'} open={open} onClose={toggleNavMenu(false)}>
        <List>
          {!user?.username && <MobileLink to='/portal'>Portal</MobileLink>}
          {user?.username && <MobileLink to='/account'>Account</MobileLink>}
          {user?.username && (
            <MobileLink to='/cart'>
              <CartCounter badgeContent={cart && cart.items.length}>
                Cart
              </CartCounter>
            </MobileLink>
          )}
          {user?.isAdmin && <MobileLink to='/admin/user/all'>Users</MobileLink>}
          {user?.isAdmin && (
            <MobileLink to='/admin/order/all'>Orders</MobileLink>
          )}
          {user?.isAdmin && (
            <MobileLink to='/admin/product/all'>Products</MobileLink>
          )}
          {user?.isAdmin && (
            <MobileLink to='/admin/product/create'>Create</MobileLink>
          )}
          <MobileLink to={'/selection/men'}>Men</MobileLink>
          <MobileLink to={'/selection/women'}>Women</MobileLink>
          <MobileLink to='/about'>About</MobileLink>
        </List>
      </Drawer>
      <DesktopMenu>
        {!user?.username && <DesktopLink to='/portal'>Portal</DesktopLink>}
        {user?.username && <DesktopLink to='/account'>Account</DesktopLink>}
        {user?.username && (
          <DesktopLink to='/cart'>
            <CartCounter badgeContent={cart && cart.items.length}>
              Cart
            </CartCounter>
          </DesktopLink>
        )}
        {user?.isAdmin && <DesktopLink to='/admin/user/all'>Users</DesktopLink>}
        {user?.isAdmin && (
          <DesktopLink to='/admin/order/all'>Orders</DesktopLink>
        )}
        {user?.isAdmin && (
          <DesktopLink to='/admin/product/all'>Products</DesktopLink>
        )}
        {user?.isAdmin && (
          <DesktopLink to='/admin/product/create'>Create</DesktopLink>
        )}
        <DesktopLink to={'/selection/men'}>Men</DesktopLink>
        <DesktopLink to={'/selection/women'}>Women</DesktopLink>
        <DesktopLink to='/about'>About</DesktopLink>
      </DesktopMenu>
    </Nav>
  )
}

const Nav = styled.nav`
  margin: 0 !important;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: space-around;
  top: 0px;
  float: left;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: black;
  display: flex;
`

const List = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  width: 8rem;
  height: 100vh;
  margin: 0;
  font-size: 1.5rem;
  background-color: black;
`

const MobileLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  margin-top: 1rem;
`
const HomeLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 2rem;
  font-family: 'Mukta', sans-serif;
  font-weight: 700;
`
const MobileMenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (min-width: 600px) {
    display: none;
    display: hidden;
  }
`
const MobileMenu = styled(MenuIcon)`
  color: white;
  @media (min-width: 600px) {
    display: none;
    display: hidden;
  }
  &:hover {
    cursor: pointer;
  }
`
const DesktopMenu = styled.ul`
  display: none;
  @media (min-width: 600px) {
    height: 100%;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    color: white;
  }
  @media (min-width: 700px) {
    gap: 3rem;
  }
`
const DesktopLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  font-size: 0.8rem;
  &.active {
    color: rgba(235, 198, 36, 0.945);
  }
  @media (min-width: 700px) {
    font-size: 1.2rem;
  }
`
const CartCounter = styled(Badge)`
  .MuiBadge-badge {
    background-color: rgba(235, 198, 36, 0.945);
    font-weight: bold;
    color: white;
  }
`
const CartIcon = styled(ShoppingCartIcon)`
  color: white;
`
