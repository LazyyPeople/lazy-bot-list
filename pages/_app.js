import '../styles/globals.css';
import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import theme from '../utils/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
