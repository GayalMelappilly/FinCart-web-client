"use client";

import React, { useState, useEffect } from "react";

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            badge: "MEGA SALE",
            title: "Premium Betta Fish",
            subtitle: "Up to 40% OFF",
            bg: "from-cyan-600 to-blue-500",
        },
        {
            badge: "NEW ARRIVAL",
            title: "Exotic Discus Fish",
            subtitle: "Starting ₹999",
            bg: "from-indigo-600 to-sky-500",
        },
        {
            badge: "FLASH SALE",
            title: "Guppy Collection",
            subtitle: "Buy 3 Get 1 FREE",
            bg: "from-blue-500 to-cyan-400",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-white h-4/6 mt-16 flex flex-col">
            {/* Top Banner */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-center py-2 px-4">
                <p className="text-sm font-medium">
                    🎉 Free Shipping on Orders Above ₹999 | Use Code: FISH100
                </p>
            </div>

            <div className="flex-1 max-w-7xl mx-auto w-full px-4 pt-6 overflow-hidden">
                {/* Main Grid */}
                <div className="grid lg:grid-cols-12 gap-6 h-full">
                    {/* Left Column - Top Deals */}

                    {/* Center - Carousel */}
                    <div className="lg:col-span-9">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg h-full">
                            {slides.map((slide, idx) => (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === idx ? "opacity-100" : "opacity-0"
                                        }`}
                                >
                                    <div
                                        className={`h-full bg-gradient-to-r ${slide.bg} flex flex-col justify-center p-8`}
                                    >
                                        <span className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white w-fit mb-3">
                                            {slide.badge}
                                        </span>
                                        <h2 className="text-4xl font-bold text-white mb-2">
                                            {slide.title}
                                        </h2>
                                        <p className="text-2xl font-semibold text-white mb-4">
                                            {slide.subtitle}
                                        </p>
                                        <button className="bg-white text-gray-900 w-fit px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                                            Shop Now →
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`h-2 rounded-full transition-all ${currentSlide === idx
                                                ? "bg-white w-6"
                                                : "bg-white/50 w-2"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - New Feature */}
                    <div className="lg:col-span-3 flex flex-col gap-3 overflow-y-auto">
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-orange-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer relative">
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                HOT
                            </div>
                            <div className="text-3xl font-bold text-orange-600">40%</div>
                            <div className="text-lg font-bold text-gray-900">OFF</div>
                            <div className="text-sm text-gray-700 font-medium">Betta Fish</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer relative">
                            <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                                NEW
                            </div>
                            <div className="text-3xl font-bold text-green-600">35%</div>
                            <div className="text-lg font-bold text-gray-900">OFF</div>
                            <div className="text-sm text-gray-700 font-medium">Aquarium Kits</div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4 hover:shadow-lg transition-all cursor-pointer relative">
                            <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                                SALE
                            </div>
                            <div className="text-3xl font-bold text-purple-600">50%</div>
                            <div className="text-lg font-bold text-gray-900">OFF</div>
                            <div className="text-sm text-gray-700 font-medium">Fish Food</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
