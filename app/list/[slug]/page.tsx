'use client'

import BackButton from '@/app/components/BackButton/BackButton'
import Footer from '@/app/components/Footer/Footer'
import Header from '@/app/components/Header/Header'
import SearchResultsPage from '@/app/components/SearchResult/SearchResult'
import React from 'react'

const Page = () => {

  return (
    <div>
      <Header />
      <BackButton />
      <SearchResultsPage />
      <Footer />
    </div>
  )
}

export default Page