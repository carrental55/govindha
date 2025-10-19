import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Global favicon and SEO */}
        <link rel="icon" href="/assets/logo.jpg" type="image/jpeg" />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="author" content="Tirupati Shankar Rentals" />
        <meta
          name="description"
          content="Tirupati Shankar Rentals offers reliable and affordable car rental services in Tirupati for temple visits, local and outstation trips."
        />
        <meta
          name="keywords"
          content="Tirupati car rental, car hire Tirupati, Tirupati cab service, Tirupati Shankar Rentals, car booking Tirupati, outstation taxi Tirupati"
        />

        {/* ✅ Open Graph */}
        <meta property="og:title" content="Tirupati Shankar Rentals - Car Hire in Tirupati" />
        <meta
          property="og:description"
          content="Affordable car rental service in Tirupati for temple visits, outstation trips, and city travel. Book your car today!"
        />
        <meta property="og:image" content="https://tirupatishankarrentals.in/assets/logo.jpg" />
        <meta property="og:url" content="https://tirupatishankarrentals.in" />
        <meta property="og:type" content="website" />

        {/* ✅ Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tirupati Shankar Rentals - Car Hire in Tirupati" />
        <meta
          name="twitter:description"
          content="Book affordable car rentals in Tirupati for local and outstation travel."
        />
        <meta name="twitter:image" content="https://tirupatishankarrentals.in/assets/logo.jpg" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
