import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {AlurakutStyles} from './src/lib/AlurakutCommons';

const GlobalStyle = createGlobalStyle`
//Reset css//
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

}

body {
    font-family:sans-serif;
    background-image:url('https://i.pinimg.com/originals/b1/7a/a2/b17aa2727e7bd44a10a25967648c1703.jpg');
    background-size: 100%;
  }
  #__next{
    display:flex;
    min-height:100vh;
    flex-direction:column;
  }
  img{
    max-width:100%;
    heigth:auto;
    display:block;
  }
  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
