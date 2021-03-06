import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
  margin: auto;
  gap: 1rem;
  width: 80%;
  @media (min-width: 415px) {
    max-width: 25rem;
  }
`
export const Input = styled.input`
  @media (min-width: 400px) {
    padding: 1rem 1.4rem;
  }
  text-align: center;
  padding: 1rem 0;
  border: none;
  color: white;
  border-radius: 0.3rem;
  background-color: rgba(187, 185, 185, 0.603);
  &:focus {
    outline: 2px solid rgba(253, 253, 185, 0.925);
  }
  &::placeholder {
    color: white;
    text-align: center;
    font-weight: 600;
  }
`
export const FormGroup = styled.fieldset`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  border: none;
`
export const TextArea = styled.textarea`
  border: 1px solid rgba(204, 174, 5, 0.945);
  border-radius: 0.5rem;
  padding: 1rem;
  height: 10rem;
  ${(props) =>
    props.dark &&
    'background-color: rgba(187, 185, 185, 0.603); color: white; &::placeholder{ color: white;}'}
  @media(max-width: 415px) {
    width: 90%;
  }
`
export const Select = styled.select`
  text-align: center;
  padding: 1rem 0;
  border: none;
  color: white;
  border-radius: 0.3rem;
  background-color: rgba(187, 185, 185, 0.603);
  &:focus {
    outline: 2px solid rgba(253, 253, 185, 0.925);
  }
  &::placeholder {
    color: white;
    text-align: center;
    font-weight: 600;
  }
`
