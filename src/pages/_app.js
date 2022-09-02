import '../styles/globals.css'
import { ToastContainer} from 'react-toastify';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Component {...pageProps} />
    <ToastContainer />
    </>
  );
}

export default MyApp
