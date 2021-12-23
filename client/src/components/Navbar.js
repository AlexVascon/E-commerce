import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../actions/userActions'
import styled from 'styled-components'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import { Link } from 'react-router-dom'

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

export default function Navbar() {
  const dispatch = useDispatch()
  const {verified} = useSelector((state) => state.authenticate)
  const [open, setOpen] = useState(false)
  const toggleNavMenu = (state) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpen(state)
  }

  useEffect(() => {
    dispatch(authenticate())
  }, [dispatch])

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
        {!verified && <NavLink to='/portal'>Portal</NavLink> }
        {verified && <NavLink to='/account'>Account</NavLink>} 
        <NavLink to='/about'>About</NavLink>
      </List> 
      </Drawer>
    </Nav>
  )
}
