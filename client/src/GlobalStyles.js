import {createGlobalStyle} from 'styled-components'

export const GlobalStyles = createGlobalStyle`
body {
  margin: 0px;
  padding: 0px;
  min - height: 100 vh;
  min - height: -webkit - fill - available;
}
html {
   height: -webkit - fill - available;
}

${'' /* easily style pagination component from external library */}
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
}

.pagination-active a {
  color: white;
  background-color: grey;
}
`