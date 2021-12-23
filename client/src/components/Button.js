import styled, {css} from 'styled-components'

export const Button = styled.button`
padding: 1rem;
border: none;
font-weight: 600;
border-radius: .3rem;
background-color: ${(props) => props.light ? 'rgba(253, 253, 185, 0.925);' : 'rgba(224, 192, 49, 0.808);' } 
box-shadow: ${(props) => props.light ? '0 5px 15px rgba(250, 243, 144, 0.616);' : '0px 10px 7px -2px rgba(250, 237, 177, 0.705);' } 
${(props) => !props.light && css`
width: 90%;
align-self: center;
margin-top: 1rem;
-webkit-box-shadow: 0px 5px 7px -2px rgba(240, 223, 69, 0.623); 
`}
&:hover {
    cursor: pointer;
  }
`
