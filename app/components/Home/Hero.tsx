'use client'

import { Compass, ShoppingBag, Package, ChevronRight, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const totalSlides = 2

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides)
        }, 10000) // Change slide every 10 seconds
        
        return () => clearInterval(interval)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    // const goToSlide = (index: number) => {
    //     setCurrentSlide(index)
    // }

    return (
        <section className="relative h-4/6 px-4 sm:px-4 md:px-10 mt-10 overflow-hidden">
            {/* Background visuals */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-64 bg-blue-500/5 rounded-full blur-3xl transform -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-full h-64 bg-white rounded-full blur-3xl transform translate-y-1/2" />
            </div>

            {/* Slides Container */}
            <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {/* Slide 1: Retail Hero */}
                <div className="w-full flex-shrink-0">
                    <div className="mx-auto px-2 sm:px-10 pt-6 sm:pt-16 lg:pt-12 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                            {/* Text Section */}
                            <div className="lg:col-span-5 space-y-4 sm:space-y-6 lg:space-y-8 text-left sm:text-center lg:text-left">
                                {/* Main heading with fancy underline */}
                                <h1 className="text-[40px] text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold text-slate-800 leading-tight lg:px-0">
                                    Discover the
                                    <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent"> Artistry </span>
                                    of Ornamental Fish
                                </h1>

                                {/* Description */}
                                <p className="text-slate-600 text-base md:text-lg sm:px-0 max-w-md mx-auto lg:mx-0">
                                    Bring vibrant colors and graceful movement into your home with our
                                    expertly curated selection of rare and exotic ornamental fish.
                                </p>

                                {/* Interactive elements grid */}
                                <div className="flex flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 w-full justify-center sm:justify-normal sm:max-w-md mx-auto lg:mx-0">
                                    <Link href={'#featuredFish'} className="flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 duration-300 text-white text-[16px] w-1/2 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all shadow-md hover:shadow-lg group">
                                        <span className='flex gap-1.5'>Browse<span className='hidden sm:block'> Collection</span></span>
                                        <Compass size={16} className="transition-transform" />
                                    </Link>

                                    <Link href={'/seller/dashboard'} className="flex items-center justify-center space-x-1 sm:space-x-2 bg-zinc-200 hover:bg-blue-300/40 font-medium hover:scale-105 duration-300 w-1/2 text-slate-800 text-[16px] py-2 sm:py-3 px-4 sm:px-6 rounded-lg border border-slate-200 transition-all">
                                        <span className='flex gap-1.5'>Sell<span className='hidden sm:block'> Your Fish</span></span>
                                        <ShoppingBag size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Image and Feature Section */}
                            <div className="lg:col-span-7 mt-1 sm:mt-6 lg:mt-0">
                                {/* Hide small image grid on mobile */}
                                <div className="block sm:hidden">
                                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-white/20 aspect-[4/3]">
                                        <Image
                                            src="/hero.jpeg"
                                            alt="hero"
                                            className="w-full h-full object-cover"
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>

                                    <div className="bg-white rounded-xl shadow-md p-4 mt-4 border border-slate-100 max-w-sm mx-auto">
                                        <div className="grid grid-cols-3 divide-x divide-slate-200">
                                            {[
                                                { title: '200+', subtitle: 'Species' },
                                                { title: 'Worldwide', subtitle: 'Shipping' },
                                                { title: 'Expert', subtitle: 'Support' },
                                            ].map((item, index) => (
                                                <div key={index} className="text-center px-2">
                                                    <h3 className="text-lg font-bold text-blue-600">{item.title}</h3>
                                                    <p className="text-xs text-slate-600">{item.subtitle}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Keep original gallery for sm+ */}
                                <div className="hidden sm:grid grid-cols-12 gap-2 sm:gap-3">
                                    {/* Main Image */}
                                    <div className="col-span-12 sm:col-span-8 sm:row-span-2 relative rounded-2xl overflow-hidden shadow-xl border border-white/20 aspect-[4/3] sm:aspect-[4/3]">
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/20" />
                                        <Image
                                            src={'/hero.jpeg'}
                                            alt='hero-image'
                                            className="w-full h-full object-cover"
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>

                                    {/* Small Gallery Images */}
                                    <div className="col-span-6 sm:col-span-4 relative rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-square sm:aspect-auto">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-400/10" />
                                        <Image
                                            src={'/hero-betta.jpeg'}
                                            alt='hero-image'
                                            className="w-full h-full object-cover"
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4 relative rounded-2xl overflow-hidden shadow-lg border border-white/20 aspect-square sm:aspect-auto">
                                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-400/10" />
                                        <Image
                                            src={'/hero-tetra.jpeg'}
                                            alt='hero-image'
                                            className="w-full h-full object-cover"
                                            width={1000}
                                            height={1000}
                                        />
                                    </div>

                                    {/* Feature Cards */}
                                    <div className="col-span-12 sm:col-span-8 -mt-6 sm:-mt-20 z-10 mx-auto w-full px-2 sm:px-0">
                                        <div className="bg-white rounded-xl shadow-lg p-3 sm:p-5 border border-slate-100">
                                            <div className="grid grid-cols-3 divide-x divide-slate-200">
                                                {[
                                                    { title: "200+", subtitle: "Species" },
                                                    { title: "Worldwide", subtitle: "Shipping" },
                                                    { title: "Expert", subtitle: "Support" }
                                                ].map((item, i) => (
                                                    <div key={i} className="px-1 sm:px-4 text-center">
                                                        <h3 className="text-sm sm:text-lg font-bold text-blue-600">{item.title}</h3>
                                                        <p className="text-xs text-slate-600">{item.subtitle}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide 2: Wholesale Hero - Completely Redesigned */}
                <div className="w-full flex-shrink-0">
                    
                    <div className="mx-auto px-2 sm:px-10 pt-6 sm:pt-16 lg:pt-12 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                            {/* Text Section */}
                            <div className="lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-6 text-left sm:text-center lg:text-left">
                                {/* Industrial badge */}
                                {/* <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200">
                                    <Package size={14} />
                                    WHOLESALE DIVISION
                                </div> */}

                                {/* Main heading */}
                                <h1 className="text-[40px] text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-black text-slate-900 leading-tight lg:px-0">
                                    WHOLESALE FISH
                                    <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent font-extrabold"> 
                                        SUPPLY
                                    </span>
                                    <span className="text-slate-700 text-2xl sm:text-3xl lg:text-3xl font-bold block mt-2">
                                        FOR BULK BUYERS
                                    </span>
                                </h1>

                                {/* Description */}
                                <p className="text-slate-600 text-base md:text-lg sm:px-0 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                    Industrial-scale fish supply with competitive bulk pricing, guaranteed stock levels, 
                                    and enterprise-grade logistics for retailers and distributors.
                                </p>

                                {/* Wholesale benefits */}
                                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
                                    {[
                                        { icon: Package, label: "Min. 100 Units", sublabel: "Per Order" },
                                        { icon: TrendingUp, label: "30-50% Off", sublabel: "Retail Price" },
                                        { icon: Shield, label: "Live Arrival", sublabel: "Guarantee" }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                                            <item.icon size={20} className="text-blue-600 mx-auto mb-1" />
                                            <div className="text-slate-900 text-sm font-bold">{item.label}</div>
                                            <div className="text-slate-500 text-xs">{item.sublabel}</div>
                                        </div>
                                    ))}
                                </div> */}

                                {/* CTA Buttons */}
                                <div className="flex flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 w-full justify-center sm:justify-normal sm:max-w-md mx-auto lg:mx-0">
                                    <Link href={'/wholesale'} className="flex items-center justify-center space-x-1 sm:space-x-2 bg-gradient-to-r from-blue-600 to-blue-800 hover:scale-105 duration-300 text-white text-[16px] w-1/2 py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-medium transition-all shadow-md hover:shadow-lg group">
                                        <span className='flex gap-1.5'>Wholesale<span className='hidden sm:block'> Collection</span></span>
                                        <Compass size={16} className="transition-transform" />
                                    </Link>

                                    {/* <Link href={'/seller/dashboard'} className="flex items-center justify-center space-x-1 sm:space-x-2 bg-zinc-200 hover:bg-blue-300/40 font-medium hover:scale-105 duration-300 w-1/2 text-slate-800 text-[16px] py-2 sm:py-3 px-4 sm:px-6 rounded-lg border border-slate-200 transition-all">
                                        <span className='flex gap-1.5'>Sell<span className='hidden sm:block'> Your Fish</span></span>
                                        <ShoppingBag size={16} />
                                    </Link> */}
                                </div>
                            </div>

                            {/* Industrial Dashboard Section */}
                            <div className="lg:col-span-6 mt-1 sm:mt-6 lg:mt-0">
                                {/* Mobile Industrial Dashboard */}
                                <div className="block sm:hidden">
                                    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-lg">
                                        <div className="text-blue-600 text-sm font-bold mb-3 flex items-center gap-2">
                                            <Package size={16} />
                                            WHOLESALE DASHBOARD
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                                <div className="text-2xl font-black text-slate-900">50K+</div>
                                                <div className="text-xs text-slate-600">Monthly Volume</div>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                                <div className="text-2xl font-black text-blue-600">24/7</div>
                                                <div className="text-xs text-slate-600">B2B Support</div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                            <div className="text-sm text-slate-700 mb-2">Current Stock Levels</div>
                                            {[
                                                { name: "Goldfish", stock: "2.5K", bar: "85%" },
                                                { name: "Betta", stock: "1.8K", bar: "65%" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex justify-between items-center mb-2">
                                                    <span className="text-xs text-slate-600">{item.name}</span>
                                                    <span className="text-xs text-slate-900 font-bold">{item.stock}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Industrial Dashboard */}
                                <div className="hidden sm:block">
                                    <div className="bg-white border border-slate-200 rounded-xl p-6">
                                        {/* <div className="flex items-center justify-between mb-6">
                                            <div className="text-blue-600 text-lg font-bold flex items-center gap-2">
                                                <Package size={20} />
                                                WHOLESALE OPERATIONS CENTER
                                            </div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        </div> */}
                                        
                                        {/* Key Metrics */}
                                        <div className="grid grid-cols-3 gap-4 mb-6">
                                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                <div className="text-3xl font-black text-slate-900 mb-1">50K+</div>
                                                <div className="text-sm text-slate-600">Fish/Month</div>
                                                <div className="text-xs text-green-600 mt-1">↗ +15% from last month</div>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                <div className="text-3xl font-black text-blue-600 mb-1">24/7</div>
                                                <div className="text-sm text-slate-600">B2B Support</div>
                                                <div className="text-xs text-green-600 mt-1">Enterprise Ready</div>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                                <div className="text-3xl font-black text-slate-900 mb-1">95%</div>
                                                <div className="text-sm text-slate-600">Live Arrival</div>
                                                <div className="text-xs text-green-600 mt-1">Industry Leading</div>
                                            </div>
                                        </div>

                                        {/* Live Stock Monitor */}
                                        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                            <div className="text-sm text-slate-700 mb-3 flex items-center gap-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                                LIVE INVENTORY STATUS
                                            </div>
                                            
                                            {[
                                                { name: "Goldfish (Bulk)", stock: "2,500", status: "In Stock", bar: "85%" },
                                                { name: "Betta Assorted", stock: "1,800", status: "In Stock", bar: "65%" },
                                                { name: "Tetra Species", stock: "3,200", status: "High Stock", bar: "95%" }
                                            ].map((item, i) => (
                                                <div key={i} className="flex justify-between items-center mb-3 last:mb-0">
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-sm text-slate-900 font-medium">{item.name}</span>
                                                            <span className="text-sm text-slate-700">{item.stock} units</span>
                                                        </div>
                                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                                            <div 
                                                                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500" 
                                                                style={{width: item.bar}}
                                                            ></div>
                                                        </div>
                                                        <div className="text-xs text-green-600 mt-1">{item.status}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center">
                <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={20} className="text-slate-700" />
                </button>
            </div>

            <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center">
                <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-white/80 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                    aria-label="Next slide"
                >
                    <ChevronRight size={20} className="text-slate-700" />
                </button>
            </div>

            {/* Slide Indicators */}
            {/* <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {Array.from({ length: totalSlides }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? 'bg-blue-600 w-8' 
                                : 'bg-white/60 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div> */}
        </section>
    )
}

export default Hero