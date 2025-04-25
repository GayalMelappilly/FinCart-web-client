import Head from 'next/head';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Hero from './components/Home/Hero';
import FeaturesFishSection from './components/Home/FeaturesFishSection';
import BreedersSection from './components/Home/BreedersSection';

export default function Home() {

  return (
    <div className="min-h-screen bg-zinc-50">
      <Head>
        <title>Fincarts</title>
        <meta name="description" content="Marketplace for ornamental fish" />
        <link rel="icon" sizes="16x16" href="./icon.ico" />
      </Head>
      <Header />
      <Hero />
      <div className='md:px-40'>
        <FeaturesFishSection />
        <BreedersSection />
      </div>
      <Footer />
    </div>
  );
}