// pages/_app.js
import "@/styles/globals.css";
import Head from "next/head";
import Nav from "../components/Nav";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Default SEO for all pages */}
        <meta name="description" content="Book your rental car with tirupatishankartravels. Affordable, flexible pickup and drop, instant booking." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Carrentas" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav />
      <Component {...pageProps} />
    </>
  );
}
