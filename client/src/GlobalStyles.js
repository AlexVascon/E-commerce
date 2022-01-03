import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
body {
  margin: 0px;
  padding: 0px;
  min - height: 100 vh;
  min - height: -webkit - fill - available;
  font-family: 'Mukta', sans-serif;
  color: #777;
}
html {
   height: -webkit - fill - available;
}

${'' /* style pagination component */}
.pagination-btns {
  width: 100%;
  height: 40px;
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
}

.pagination-btns a {
  padding: 10px;
  margin: 8px;
  border-radius: 5px;
  border: 1px solid grey;
  color: grey;
  &:hover {
    cursor: pointer;
  }
}

.pagination-active a {
  color: white;
  background-color: grey;
}

${'' /* style pagination library */}
.item-suggestions-carousel {
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: 500px) {
  height: 20rem;
}
}
`
