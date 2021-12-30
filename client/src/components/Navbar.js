import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { fetchCartItems } from '../actions/cartActions'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge';

export default function Navbar() {
  const dispatch = useDispatch()
  const {cart} = useSelector((state) => state.fetchCartItems)
  const accessToken = localStorage.getItem('accessToken')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
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

  return (
    <Nav>
      <HomeLink to='/'>Shop</HomeLink>
      <Test>
      <MobileMenu fontSize='large' onClick={toggleNavMenu(true)} />
      </Test>
      <Drawer
        anchor={'right'}
        open={open}
        onClose={toggleNavMenu(false)}
        >
      <List>
        {!isLoggedIn && <NavLink to='/portal'>Portal</NavLink> }
        {isLoggedIn && <NavLink to='/account'>Account</NavLink>} 
        {isLoggedIn && <NavLink to='/cart'>Cart</NavLink>} 
        <NavLink to={'/selection/men'}>Men</NavLink> 
        <NavLink to={'/selection/women'}>Women</NavLink> 
        <NavLink to='/about'>About</NavLink>
      </List> 
      </Drawer>
      <DesktopMenu>
        {!isLoggedIn && <DesktopLink to='/portal'>Portal</DesktopLink> }
        {isLoggedIn && <DesktopLink to='/account'>Account</DesktopLink>} 
        {isLoggedIn && <DesktopLink to='/cart'>Cart</DesktopLink>} 
        <DesktopLink to={'/selection/men'}>Men</DesktopLink> 
        <DesktopLink to={'/selection/women'}>Women</DesktopLink> 
        <DesktopLink to='/about'>About</DesktopLink>
      </DesktopMenu>
      <Badge badgeContent={cart && cart.items.length} color='secondary' >
        <CartIcon color='white' />
      </Badge>
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

const NavLink = styled(Link)`
text-decoration: none;
color: white;
margin-top: 1rem;
`

const HomeLink = styled(Link)`
text-decoration: none;
color: white;
font-size: 2rem;
`
const Test = styled.div`
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
gap: 4rem;
align-items: center;
justify-content: center;
color: white;
}
`
const DesktopLink = styled(Link)`
text-decoration: none;
color: white;
font-size: 1.2rem;
`
const CartIcon = styled(ShoppingCartIcon)`
color: white;
`
