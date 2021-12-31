import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { fetchCartItems } from '../actions/cartActions'
import { authenticate } from '../actions/userActions'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import { NavLink } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge';

export default function Navbar() {
  const dispatch = useDispatch()
  const {cart} = useSelector((state) => state.fetchCartItems)
  const {userInfo} = useSelector((state) => state.authenticate)
  const accessToken = localStorage.getItem('accessToken')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(undefined)
  const [open, setOpen] = useState(false)

  const toggleNavMenu = (state) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(state)
  }

  useEffect(() => {
    if(accessToken) setIsLoggedIn(true)
    else setIsLoggedIn(false)
  }, [accessToken])

  useEffect(() => {
    dispatch(fetchCartItems())
  }, [dispatch])

  // get auth
  useEffect(() => {
    if(!user) dispatch(authenticate())
  }, [dispatch, user])

  // set auth
  useEffect(() => {
    if(userInfo) setUser(userInfo)
  }, [userInfo])

  return (
    <Nav>
      <HomeLink to='/'>Shop</HomeLink>
      <MobileMenuContainer >
      <MobileMenu fontSize='large' onClick={toggleNavMenu(true)} />
      <CartCounter badgeContent={cart && cart.items.length} >
        <CartIcon color='white' />
      </CartCounter>
      </MobileMenuContainer>
     
      <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleNavMenu(false)}
        >
      <List>
        {!isLoggedIn && <NavLink to='/portal'>Portal</NavLink> }
        {isLoggedIn && <NavLink to='/account'>Account</NavLink>} 
        {isLoggedIn && <NavLink to='/cart'>Cart</NavLink>} 
        {user?.isAdmin && <NavLink to='/product/all'>Products</NavLink>}
        {user?.isAdmin && <NavLink to='/product/create'>Create</NavLink>}
        <NavLink to={'/selection/men'}>Men</NavLink> 
        <NavLink to={'/selection/women'}>Women</NavLink> 
        <NavLink to='/about'>About</NavLink>
      </List> 
      </Drawer>
      <DesktopMenu>
        {!isLoggedIn && <DesktopLink to='/portal'>Portal</DesktopLink> }
        {isLoggedIn && <DesktopLink to='/account'>Account</DesktopLink>} 
        {isLoggedIn && <DesktopLink to='/cart'>Cart</DesktopLink>} 
        {user?.isAdmin && <DesktopLink to='/product/all'>Products</DesktopLink>}
        {user?.isAdmin && <DesktopLink to='/product/create'>Create</DesktopLink>}
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
  float:left;
  padding-top: .5rem;
  padding-bottom: .5rem;
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
`
const MobileMenuContainer = styled.div`
display: flex;
align-items: center;
gap: 1rem;
@media(min-width: 600px) {
  display: none;
  display: hidden;
}
`
const MobileMenu = styled(MenuIcon)`
color: white;
@media(min-width: 600px) {
  display: none;
  display: hidden;
}
&:hover {
  cursor: pointer;
}
`
const DesktopMenu = styled.ul`
display: none;
@media(min-width: 600px) {
  height: 100%;
  display: flex;
gap: 2rem;
align-items: center;
justify-content: center;
color: white;
}
@media(min-width: 700px) {
gap: 3rem;
}
`
const DesktopLink = styled(NavLink)`
text-decoration: none;
color: white;
font-size: .8rem;
&.active {
    color: rgba(235, 198, 36, 0.945);
  }
@media(min-width: 700px) {
  font-size: 1.2rem;
}

`
const CartCounter = styled(Badge)`
.MuiBadge-badge {
  background-color: rgba(235, 198, 36, 0.945);
  font-weight: bold;
}
`
const CartIcon = styled(ShoppingCartIcon)`
color: white;
`
