import styled, { css } from 'styled-components'

const ViewValues = styled.div`
position: relative;
width: 100%;
height: 93%;
display: flex;
flex-direction: column;
overflow-y: scroll;
background-image: url(${(props) => props.imageUrl});
background-position-y: center;
background-position-x: center;
background-repeat: no-repeat;
background-size: cover;
`
export const View = styled(ViewValues)``

export const ViewResponsive = styled(ViewValues)`
@media (min-width: 550px) {
  flex-direction: row;
  gap: 3rem;
  justify-content: center
}
`

const SectionValues = styled.div`
position: relative;
width: 100%;
min-height: 100%;
display: flex;
flex-direction: column;
background-image: url(${(props) => props.imageUrl});
background-position-y: center;
background-position-x: center;
background-repeat: no-repeat;
background-size: cover;
${props => props.invert && css`
@media (min-width: 550px) {
  flex-direction: row;
}
`}

`
export const Section = styled(SectionValues)``

export const SectionResponsive = styled(SectionValues)`
@media (min-width: 550px) {
  flex-direction: row;
}
`
export const List = styled.ul`
flex: 1;
margin: auto;
margin-top: 1rem;
justify-content: center;
align-items: center;
text-align: center;
padding: 0;
width: 100%;
`
export const Row = styled.li`
width: 90%;
margin: auto;
display: flex;
justify-content: space-around;
border-bottom: 1px solid rgba(128, 128, 128, 0.363);
`
export const RowText = styled.p`
margin-top: .5rem;
margin-bottom: .5rem;
`