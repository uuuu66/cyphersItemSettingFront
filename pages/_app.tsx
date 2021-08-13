import { AppProps } from 'next/dist/next-server/lib/router/router'
import Head from '../components/templates/header'
import Footer from '../components/templates/footer'
import Aside from '../components/templates/aside'
import Layout from '../components/templates/layout'
import Info from '../components/templates/info'

import '../styles/global.css'
function MyApp({ Component, pageProps}:AppProps) {
  
  return(<> 
      <Head/>
        <Info/>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        <Aside/>
      <Footer/>
  </>)
}

export default MyApp
