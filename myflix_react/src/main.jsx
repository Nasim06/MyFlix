import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider, ColorModeScript, extendTheme} from '@chakra-ui/react'
import theme from './theme.jsx'


const style = {
  colors:{
    dark:{
      primary: '#457b9d',
      secondary: '#f28482',
      accent: '#9381ff' 
    },
    light: {
      primary: '#a2d2ff',
      secondary: '#ffc8dd',
      accent: '#b8b8ff' 
    }
  }
}

const colorScheme = extendTheme(style)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={colorScheme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)
