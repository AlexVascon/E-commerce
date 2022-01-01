import styled from 'styled-components'
import ringImage from '../assets/donught_corner_img.jpg'
import CircularProgress from '@mui/material/CircularProgress'

export const Container = styled.div`
height: ${props => props.height};
width: ${props => props.width};
display: flex;
margin: auto;
${props => props.border && "border-bottom: 2px solid rgba(235, 198, 36, 0.945);"}
${props => props.shadow && "box-shadow: 0px 13px 11px -5px rgba(0, 0, 0, 0.17);"}
background-color: ${props => props.background};
position: relative;
`
export const HoldImage = styled.div`
flex: 2;
height: 10rem;
display: flex;
height: ${props => props.height};
overflow: hidden;
justify-content: center;
background-image: ${props => props.background && "url(" + ringImage + ")"};
background-size: contain;
background-repeat: no-repeat;
${props => props.transparent && "background-color: transparent;"};
img {
  width: 50%;
  object-position: 50%;
}
`
export const SubContainer = styled.div`
flex: ${props => props.flex};
display: flex;
${props => props.column && "flex-direction: column"};
border-left: 1.8px solid rgba(204, 203, 203, 0.432);
${props => props.center && "justify-content: center; align-items: center;"}
`
export const Absolute = styled.p`
position: absolute;
width: ${props => props.width};
left: ${props => props.left};
right: ${props => props.right};
top: ${props => props.top};
bottom: ${props => props.bottom};
z-index: ${props => props.z};
`
export const View = styled.div`
position: relative;
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
overflow-y: scroll;
background-image: url(${(props) => props.imageUrl});
background-position-y: center;
background-position-x: center;
background-repeat: no-repeat;
background-size: cover;
@media (min-width: 700px) {
  ${props => props.responsive && "flex-direction: row;"}
  gap: ${props => props.gap};
}
`
export const Section = styled.div`
position: relative;
width: 100%;
min-height: 100%;
display: flex;
flex-direction: column;
${props => props.center && "align-items: center; justify-content: center;"}
background-image: url(${(props) => props.imageUrl});
background-position-y: center;
background-position-x: center;
background-repeat: no-repeat;
background-size: cover;
@media (min-width: 550px) {
  ${props => props.responsive && "flex-direction: row;"}
  ${props => props.divider && "border-left: 1px solid #CCC"}
}
`
export const Heading = styled.h2`
margin: auto;
margin-bottom: ${props => props.bottom ? props.bottom : '2%'};
margin-top: ${props => props.top ? props.top : '2%'};
margin-left: ${props => props.left ? props.left : '5%'};
${props => props.center && "text-align: center;"}
font-size: ${props => props.size};
color: rgba(235, 198, 36, 0.945);
@media(min-width: 550px) {
  ${props => props.static && 
"position: absolute; left: 5%; top: -.5%; width: 100%; z-index: 2;"
}
}
`
export const SubTitle = styled.h2`
width: 100%;
text-align: left;
padding-left: 1.5rem;
font-weight: 700;
color: rgba(235, 198, 36, 0.945);
font-size: 1rem;
`
export const List = styled.ul`
flex: 1;
margin: auto;
margin-top: 1rem;
display: flex;
flex-direction: column;
align-items: center;
padding: 0;
width: 100%;
max-height: 80vh;
${props => props.scroll && "overflow-y: scroll;"}
gap: ${props => props.gap};
`
export const Row = styled.li`
width: 90%;
margin: auto;
display: flex;
padding: 0;
margin: .5rem 0;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid rgba(128, 128, 128, 0.363);
${props => props.responsive && "flex-direction: column;"}
`
export const RowText = styled.p`
margin-top: .5rem;
margin-bottom: .5rem;
`
export const Button = styled.button`
padding: 1rem;
border: none;
font-weight: 600;
border-radius: .3rem;
background-color: ${(props) => props.light ? 'rgba(253, 253, 185, 0.925);' : 'rgba(224, 192, 49, 0.808);' };
box-shadow: ${(props) => props.light ? '0px 4px 8px rgba(250, 243, 144, 0.616);' : '0px 10px 7px -2px rgba(250, 237, 177, 0.705);' };
width: 90%;
align-self: center;
margin-top: 1rem;
color: black;
&:hover {
    cursor: pointer;
  }
`
export const Error = styled.p`
 color: RGB(138, 40, 29);
 font-weight: bold;
 border: none;
  outline: none;
  padding: 1rem;
  background-color: rgba(253, 163, 249, 0.582);
  width: 80%;
  align-self: center;
  justify-self: center;
  margin: auto;
  margin-top: ${props => props.top};
  margin-bottom: ${props => props.bottom};
`
export const Message = styled(Error)`
background-color: RGB(65, 134, 217);
color: RGB(20, 47, 102);
`
export const LoadingSpinner = styled(CircularProgress)`
width: 6rem;
height: auto;
margin: auto;
align-self: center;
justify-self: center;
${props => props.big && "width: 12rem;"}
`