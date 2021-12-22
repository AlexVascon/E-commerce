import styled from 'styled-components'

export const Image = styled.div`
width: 100%;
height: 100vh;
background-image: url(${(props) => props.imageUrl});
background-size: cover;
background-repeat: no-repeat;
display: flex;
justify-content:center;
align-items:center;
margin: auto;
background-color: rgba(0, 0, 0, 0.719);
background-blend-mode:hue;
`