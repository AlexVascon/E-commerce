import React from 'react'
import styled from 'styled-components'
import { Container, Heading } from './MyLibrary'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import { useNavigate } from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <FooterEl>
      <Container height='10rem'>
        <SubEl column flex='.5'>
          <CopyRight>E-commerce © 2021 Copyright</CopyRight>
        </SubEl>
        <SubEl flex='2'>
          <Heading top='.5rem'>Contact</Heading>
          <Group>
            <EmailIcon fontSize='small' /> <p>1vasconalex1@gmail.com</p>
          </Group>
          <Group>
            <GitHubIcon fontSize='small' />{' '}
            <a
              href='https://github.com/AlexVascon'
              rel='noopener noreferrer'
              target='_blank'
            >
              https://github.com/AlexVascon
            </a>
          </Group>
          <Group>
            <LinkedInIcon fontSize='small' />{' '}
            <a
              href='https://www.linkedin.com/in/alex-vasconcelos-de-almeida/'
              rel='noopener noreferrer'
              target='_blank'
            >
              https://www.linkedin.com/in/alex-vasconcelos-de-almeida/
            </a>
          </Group>
        </SubEl>
        <SubEl flex='1'>
          <Heading>Pages</Heading>
          <p onClick={() => navigate('/portal')}>Portal</p>
          <p onClick={() => navigate('/selection/men')}>Men</p>
          <p onClick={() => navigate('/selection/women')}>Women</p>
          <p onClick={() => navigate('/')}>Home</p>
          <p onClick={() => navigate('/about')}>About</p>
        </SubEl>
      </Container>
    </FooterEl>
  )
}

const FooterEl = styled.footer`
  width: 100%;
  height: 11rem;
  background-color: black;
`
const SubEl = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
  p {
    margin: 0;
    color: white;
    @media (max-width: 600px) {
      font-size: 0.8rem;
    }
    &:hover {
      cursor: pointer;
    }
  }
`
const Group = styled(SubEl)`
  flex-direction: row;
  a {
    text-decoration: none;
    color: white;
    &:hover {
      cursor: pointer;
    }
  }
`
const CopyRight = styled(Heading)`
  font-size: 0.5rem;
  @media (min-width: 600px) {
    font-size: 1rem;
  }
`
