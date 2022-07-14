import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      const randomId = Math.random().toString().slice(2, 10);
      return localStorage.setItem('user', 'user' + randomId)
    }

  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
