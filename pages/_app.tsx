import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from '../components/header'
import Footer from '../components/footer'
import '../styles/global.css'
import Aside from '../components/aside';
import { Children } from 'react';

function MyApp({ Component, pageProps}:AppProps) {
  
  return(<> 
      <Head/>
      
      <Component {...pageProps} />
      <Aside></Aside>
      <Footer/>
  </>)
}

export default MyApp
