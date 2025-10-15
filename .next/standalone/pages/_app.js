import '@/styles/globals.css'
import Head from 'next/head'
import Nav from '../components/Nav'  // Import Nav component

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav /> {/* Nav will appear on every page */}
      <Component {...pageProps} />
    </>
  )
}
