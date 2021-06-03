import { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';

import { GlobalStyle } from '../styles/global';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
      <GlobalStyle />
    </>
  );
}

export default MyApp;
