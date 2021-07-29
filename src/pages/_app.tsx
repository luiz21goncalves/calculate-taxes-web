import { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';

import { theme } from '../styles/theme';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  );
}

export default MyApp;
