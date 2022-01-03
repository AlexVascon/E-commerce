import styled from 'styled-components'

export const Table = styled.table`
width: 100%;
border-collapse: collapse;
`
export const TR = styled.tr`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`
export const TH = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  overflow-wrap: break-word;
  @media(max-width: 415px) {
    font-size: .6rem;
    width: ${props => props.width};
  }
`
export const TD = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  ${props => props.green && "background-color: RGB(98, 252, 144);"}
  ${props => props.red && "background-color: RGB(255, 110, 110);"}
`
export const Button = styled.button`
  border: none;
  background-color: rgba(235, 198, 36, 0.945);
  color: black;
  font-weight: 900;
  padding: 0.5rem;
  border-radius: 0.3rem;
  &:hover {
    cursor: pointer;
  }
`