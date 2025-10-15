import Head from 'next/head';
import { useRouter } from 'next/router';
import Hero from '../components/Hero';
import FeaturedCars from '@/components/FeaturedCars';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

export default function Home() {
  const router = useRouter();

  const handleSearch = (tripData) => {
    router.push({
      pathname: '/carlist',
      query: {
        pickupText: tripData.pickupText,
        dropText: tripData.dropText,
        pickupDate: tripData.pickupDate,
        pickupTime: tripData.pickupTime,
        distance: tripData.distance,
        duration: tripData.duration,
      },
    });
  };

  return (
    <>
      <Head><title>Car Rental Home</title></Head>
      <main style={{ padding: '2rem' }}>
        <Hero onSearch={handleSearch} />
        <FeaturedCars />
        <Features />
        <Footer />
      </main>
    </>
  );
}
