import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import { Link } from 'react-router-dom'

export default function Navbar() {
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

  return (
    <Nav>
      <HomeLink to='/'>Shop</HomeLink>
      <MenuIcon fontSize='large' onClick={toggleNavMenu(true)} />
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
    </Nav>
  )
}

const Nav = styled.nav`
width: 100%;
height: 7%;
display: flex;
justify-content: space-around;
align-items: center;
background-color: black;
color: white;
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
