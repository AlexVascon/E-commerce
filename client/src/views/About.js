import React from 'react'
import { Heading, SubTitle, View } from '../components/MyLibrary'
import styled from 'styled-components'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export default function About() {
  return (
    <View>
      <Heading bottom='.5rem' top='1rem' size='1.5rem'>
        About
      </Heading>
      <AboutContainer>
        <p>
          This project has been developed by myself, Alex Vasconcelos de Almeida
          as part of my portfolio entry. I created this building on the skills I
          learned during my time at the Ironhack tech international school.
          <br />
          The whole project is developed with MERN (MongoDB | ExpressJS |
          ReactJS | NodeJS) combined with React-Redux and Material UI. I also
          created my own customizable, reusable components using styled
          components.
        </p>
        <SubHeading>CONTACT DETAILS</SubHeading>
        <EmailIcon /> 1vasconalex1@gmail.com
        <br />
        <GitHubIcon />{' '}
        <a href='https://github.com/AlexVascon'>
          https://github.com/AlexVascon
        </a>
        <br />
        <LinkedInIcon />{' '}
        <a href='https://www.linkedin.com/feed/'>
          https://www.linkedin.com/feed/
        </a>
      </AboutContainer>
    </View>
  )
}

const AboutContainer = styled.div`
  margin: auto;
  margin-top: 0rem;
  width: 95%;
  align-self: center;
  justify-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`
const SubHeading = styled(SubTitle)`
  text-align: center;
`
