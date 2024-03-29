import '../../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import { AppProps } from 'next/app';

import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  )
}

export default MyApp
