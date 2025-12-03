'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Zap, ArrowRight, Utensils, Leaf, Filter, Lightbulb, Sparkles, Pill } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Mock Data for Categories
const categories = [
    { name: 'Food', icon: <Utensils size={20} />, color: 'from-orange-400 to-orange-600', href: '/category/food' },
    { name: 'Plants', icon: <Leaf size={20} />, color: 'from-green-400 to-green-600', href: '/category/plants' },
    { name: 'Filters', icon: <Filter size={20} />, color: 'from-purple-400 to-purple-600', href: '/category/filters' },
    { name: 'Lighting', icon: <Lightbulb size={20} />, color: 'from-yellow-400 to-yellow-600', href: '/category/lighting' },
    { name: 'Decor', icon: <Sparkles size={20} />, color: 'from-pink-400 to-pink-600', href: '/category/decor' },
    { name: 'Medicine', icon: <Pill size={20} />, color: 'from-red-400 to-red-600', href: '/category/medicine' },
];

// Mock Data for Carousel
const slides = [
    {
        id: 1,
        title: "Premium Betta Collection",
        subtitle: "Imported Exotic Strains",
        offer: "Flat 30% OFF",
        // Modern mesh gradient
        bgGradient: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-400 via-purple-500 to-indigo-900",
        cta: "Shop Now",
        image: "/hero/betta_fish_hero.png"
    },
    {
        id: 2,
        title: "Aquascaping Essentials",
        subtitle: "Create Your Dream Tank",
        offer: "Starting ₹499",
        bgGradient: "bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-400 via-teal-500 to-emerald-900",
        cta: "Explore",
        image: "/hero/aquascape_hero.png"
    },
    {
        id: 3,
        title: "Monster Fish Sale",
        subtitle: "Arowana, Stingrays & More",
        offer: "Limited Time Deal",
        bgGradient: "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 via-red-500 to-pink-600",
        cta: "Grab Deal",
        image: "/hero/arowana_hero.png"
    }
];

// Variants for Swipe Animation
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0
    })
};

export default function Hero() {
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 slides, so we wrap the index
    const currentSlide = ((page % slides.length) + slides.length) % slides.length;

    useEffect(() => {
        const timer = setInterval(() => {
            setPage([page + 1, 1]);
        }, 6000);
        return () => clearInterval(timer);
    }, [page]);

    const nextSlide = () => setPage([page + 1, 1]);
    const prevSlide = () => setPage([page - 1, -1]);

    return (
        <div className="bg-gradient-to-b from-blue-50/50 to-white pt-24 md:pt-20 px-4 md:px-8 lg:px-20 pb-4 h-auto lg:max-h-5/6 overflow-hidden">

            {/* 1. Floating Category Strip (Text Only Dock) */}
            <div className="container mx-auto px-4 mb-6 md:mb-8 flex justify-center">
                <div className="bg-white border border-gray-100 shadow-xl shadow-blue-900/5 rounded-3xl px-6 md:px-10 py-3 md:py-4 w-full md:w-fit max-w-full">
                    <div className="flex items-center gap-6 md:gap-12 overflow-x-auto no-scrollbar px-2">
                        {categories.map((cat, idx) => (
                            <Link key={idx} href={cat.href} className="group cursor-pointer relative py-1">
                                <span className="text-xs md:text-sm font-bold text-gray-500 group-hover:text-blue-600 transition-colors whitespace-nowrap uppercase tracking-[0.2em]">
                                    {cat.name}
                                </span>
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

                    {/* 2. Modern Glassmorphism Carousel */}
                    <div className="lg:col-span-8 xl:col-span-9 relative group h-56 sm:h-64 lg:h-72">
                        <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20">
                            <AnimatePresence initial={false} custom={direction} mode='popLayout'>
                                <motion.div
                                    key={page}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 200, damping: 30 },
                                        opacity: { duration: 0.5 }
                                    }}
                                    className={`absolute inset-0 ${slides[currentSlide].bgGradient} flex items-center`}
                                >
                                    {/* Background Image with Blend Mode */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={slides[currentSlide].image}
                                            alt={slides[currentSlide].title}
                                            fill
                                            className="object-cover mix-blend-overlay opacity-60"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                                    </div>

                                    {/* Abstract Shapes/Noise Overlay */}
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-0"></div>

                                    <div className="relative z-10 px-6 md:px-16 max-w-3xl w-full">
                                        <div
                                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/20 mb-6 shadow-lg"
                                        >
                                            <Zap size={14} className="fill-yellow-400 text-yellow-400" />
                                            {slides[currentSlide].offer}
                                        </div>

                                        <h2
                                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 tracking-tight leading-[1.1]"
                                        >
                                            {slides[currentSlide].title}
                                        </h2>

                                        <p
                                            className="text-base md:text-lg text-blue-50/90 mb-4 font-medium max-w-lg leading-relaxed"
                                        >
                                            {slides[currentSlide].subtitle}
                                        </p>

                                        <button
                                            className="group bg-white text-gray-900 px-6 py-2 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all shadow-xl shadow-black/10 flex items-center gap-3"
                                        >
                                            {slides[currentSlide].cta}
                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    {/* Glass Card Decoration */}
                                    <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 hidden md:block"></div>
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation Controls */}
                            <div className="hidden md:flex absolute bottom-8 right-8 gap-4 z-20">
                                <button
                                    onClick={prevSlide}
                                    className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={nextSlide}
                                    className="w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            {/* Progress Indicators */}
                            <div className="absolute bottom-8 right-8 md:right-auto md:left-1/2 md:-translate-x-1/2 flex gap-3 z-20">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setPage([page + (idx - currentSlide), idx > currentSlide ? 1 : -1])}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === idx
                                            ? 'w-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                                            : 'w-2 bg-white/30 hover:bg-white/50'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Modern Promo Grid */}
                    <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 flex-col gap-6 h-full">

                        {/* Card 1: Glassmorphism Light */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="flex-1 bg-white rounded-3xl p-6 shadow-xl shadow-blue-900/5 border border-blue-50 relative overflow-hidden group cursor-pointer"
                        >
                            <div className="absolute top-0 right-0 p-4 z-10">
                                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-red-500/30">Flash Sale</span>
                            </div>

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="text-gray-400 font-semibold text-xs tracking-widest uppercase mb-2">Weekly Deal</h3>
                                    <div className="text-3xl font-black text-gray-900 mb-1 leading-none">Discus<br />Fish</div>
                                    <div className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Min. 40% Off</div>
                                </div>
                                <div className="flex justify-end mt-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Blob */}
                            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                            {/* Product Image Background */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/hero/discus_fish_deal.png"
                                    alt="Discus Fish"
                                    fill
                                    className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Gradient Overlay for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent/20"></div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
