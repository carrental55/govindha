// pages/index.js
import Head from "next/head";
import Hero from "../components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Tables from "@/components/Tables";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <>
      <Head>
        <title>Tirupathi Shankar Travels</title>
        <meta name="description" content="Book your rental car with Carrentas. Affordable, flexible pickup and drop, instant booking." />
        <link rel="canonical" href="https://tirupatishankartravels.in" />
        
        {/* Open Graph */}
        <meta property="og:url" content="https://tirupatishankartravels.in" />
        <meta property="og:title" content="Car Rentals in Tirupati — Carrentas" />
        <meta property="og:description" content="Book your rental car with Carrentas. Affordable, flexible pickup and drop, instant booking." />
        <meta property="og:image" content="https://tirupatishankartravels.in" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Carrentas" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="Car Rentals Near You — Carrentas" />
        <meta name="twitter:description" content="Book your rental car with Carrentas. Affordable, flexible pickup and drop, instant booking." />
        <meta name="twitter:image" content="https://tirupatishankartravels.in" />
      </Head>

      <main style={{ padding: "2rem" }}>
        <Hero />
        <Tables/>
        <FeaturedCars />
        <Features />
        <Reviews/>
        <Footer />
      </main>
    </>
  );
}
