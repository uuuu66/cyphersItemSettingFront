import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from '../components/header'
import Footer from '../components/footer'
import Aside from '../components/aside';
import Layout from '../components/layout';
import '../styles/global.css'
function MyApp({ Component, pageProps}:AppProps) {
  
  return(<> 
      <Head/>
       <Layout>
          <Component {...pageProps} />
        </Layout>
        <Aside/>
      <Footer/>
  </>)
}

export default MyApp
