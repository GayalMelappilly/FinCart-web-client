'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/app/components/Header/Header';
import Footer from '@/app/components/Footer/Footer';
import BackButton from '@/app/components/BackButton/BackButton';
import Listings from '@/app/components/BreedersPage/Listings';
import About from '@/app/components/BreedersPage/About';
import BreedersProfile from '@/app/components/BreedersPage/BreedersProfile';
import NavigationTab from '@/app/components/BreedersPage/NavigationTab';
import Spinner from '@/app/components/LoadingSpinner/Spinner';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getBreederInfo } from '@/app/services/authServices';
import { SellerProfileDetails } from '@/app/types/sellerProfile/type';

const BreederStore = () => {
    const [activeTab, setActiveTab] = useState('listings');
    const [breederData, setBreederData] = useState<SellerProfileDetails | undefined>();

    const params = useParams()
    const id = params?.id as string

    const { data, isLoading } = useQuery({
        queryKey: ['get-breeder-info'],
        queryFn: () => getBreederInfo(id)
    })


    useEffect(() => {
        if (data) setBreederData(data.data)
    }, [data]);

    console.log(breederData)

    if (isLoading) return <Spinner />

    return (
        <div className="min-h-screen bg-gray-50">
            <Head>
                <title>Tropical Fish Hobbyist | Fishy</title>
                <meta name="description" content="Premium tropical fish from an experienced breeder" />
            </Head>
            <Header />
            <BackButton />
            <div className='md:px-30 mx-5 md:mx-0 mt-5'>
                {breederData && <BreedersProfile breeder={breederData?.seller} /> }
                <NavigationTab activeTab={activeTab} setActiveTab={setActiveTab} />
                <main className="container mx-auto py-8 max-w-6xl mb-20">
                    {breederData && activeTab === 'listings' ? (
                        <Listings fishListings={breederData?.listings} />
                    ) : (
                        <About />
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default BreederStore