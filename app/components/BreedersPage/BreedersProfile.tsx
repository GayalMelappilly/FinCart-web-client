import { SellerInfo } from '@/app/types/sellerProfile/type'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { MapPin, Calendar, Mail, Globe, Award, Shield, Truck, Package, Users, Star, ChevronDown } from 'lucide-react'

type Props = {
    breeder: SellerInfo
}

const BreedersProfile: FC<Props> = ({ breeder }) => {
    const [showFullDescription, setShowFullDescription] = useState(false)

    const formatDate = (date: Date | null) => {
        if (!date) return 'N/A'
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Hero Section with Profile Info */}
            <section className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 relative">
                    {/* Organization details overlapping the gradient */}
                    <div className="absolute -bottom-16 w-full px-6 flex items-end">
                        <div className="bg-white rounded-lg p-1 shadow-md">
                            <Image
                                src={breeder.logo_url || "/placeholder-logo.png"}
                                alt={`${breeder.display_name} logo`}
                                width={96}
                                height={96}
                                className="rounded-md object-cover w-24 h-24"
                            />
                        </div>

                        <div className="ml-4 pb-4">
                            <h1 className="text-white text-2xl font-bold">{breeder.display_name}</h1>
                            <div className="flex items-center text-white/90 text-sm">
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                                    <span className="ml-1 font-medium">{breeder.seller_rating || '4.9'}</span>
                                </div>
                                <span className="mx-2">•</span>
                                <span>{breeder.metrics?.total_orders || '1,000'} orders</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="pt-20 px-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        {/* Location and member since */}
                        <div className="flex flex-col gap-2 text-gray-600">
                            <div className="flex items-center text-sm">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>
                                    {breeder.location?.city && breeder.location.state
                                        ? `${breeder.location.city}, ${breeder.location.state}`
                                        : 'Location not specified'}
                                </span>
                            </div>
                            <div className="flex items-center text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>Member since {formatDate(breeder.joined_date)}</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Follow
                            </button>
                            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-medium text-white transition flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Message
                            </button>
                        </div>
                    </div>

                    {/* About section */}
                    <div className="mt-6">
                        <h2 className="text-lg font-medium text-gray-800 mb-2">About {breeder.business_name}</h2>
                        <div className="bg-gray-50 rounded-lg p-4 text-gray-600">
                            {breeder.store_description ? (
                                <>
                                    <p className={showFullDescription ? '' : 'line-clamp-3'}>
                                        {breeder.store_description}
                                    </p>
                                    {breeder.store_description.length > 200 && (
                                        <button
                                            onClick={() => setShowFullDescription(!showFullDescription)}
                                            className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-2 flex items-center"
                                        >
                                            {showFullDescription ? 'Show less' : 'Read more'}
                                            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </>
                            ) : (
                                <p className="text-gray-400 italic">No description available</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Details */}
            <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Information */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <Award className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">Business Type</p>
                                <p className="text-sm text-gray-600">{breeder.business_type || 'Not specified'}</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <Globe className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">Website</p>
                                {breeder.website_url ? (
                                    <a href={breeder.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                                        {breeder.website_url}
                                    </a>
                                ) : (
                                    <p className="text-sm text-gray-600">Not available</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="flex-shrink-0">
                                <MapPin className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700">Location</p>
                                <p className="text-sm text-gray-600">
                                    {breeder.location?.city && breeder.location?.state && breeder.location?.country
                                        ? `${breeder.location.city}, ${breeder.location.state}, ${breeder.location.country}`
                                        : 'Full location not specified'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Business Metrics */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Business Metrics</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <div className="flex items-center text-blue-600 mb-2">
                                <Package className="w-5 h-5" />
                                <span className="ml-2 font-medium text-sm">Total Listings</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">{breeder.metrics.total_listings}</p>
                            <p className="text-sm text-gray-600">{breeder.metrics.active_listings} active</p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <div className="flex items-center text-green-600 mb-2">
                                <Truck className="w-5 h-5" />
                                <span className="ml-2 font-medium text-sm">Total Sales</span>
                            </div>
                            <p className="text-2xl font-bold text-gray-800">${breeder.metrics.total_sales}</p>
                            <p className="text-sm text-gray-600">{breeder.metrics.total_orders} orders</p>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg col-span-2">
                            <div className="flex items-center text-yellow-600 mb-2">
                                <Star className="w-5 h-5" />
                                <span className="ml-2 font-medium text-sm">Average Rating</span>
                            </div>
                            <div className="flex items-center">
                                <p className="text-2xl font-bold text-gray-800">{breeder.metrics.avg_rating}</p>
                                <div className="ml-3 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(Number(breeder.metrics.avg_rating)) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Policies */}
            <section className="mt-6 bg-white border mb-8 border-gray-200 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Business Policies</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <Shield className="w-5 h-5 text-blue-500" />
                            <span className="ml-2 font-medium">Warranty</span>
                        </div>
                        <p className="text-gray-600">{breeder.policies.warranty_period_days} days warranty</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <Package className="w-5 h-5 text-blue-500" />
                            <span className="ml-2 font-medium">Returns</span>
                        </div>
                        <p className="text-gray-600">{breeder.policies.return_window_days} days return window</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <Truck className="w-5 h-5 text-blue-500" />
                            <span className="ml-2 font-medium">Shipping</span>
                        </div>
                        <p className="text-gray-600">Via {breeder.policies.shipping_provider}</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <Package className="w-5 h-5 text-blue-500" />
                            <span className="ml-2 font-medium">Min. Order Value</span>
                        </div>
                        <p className="text-gray-600">${breeder.policies.min_order_value}</p>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center mb-2">
                            <Award className="w-5 h-5 text-blue-500" />
                            <span className="ml-2 font-medium">Order Acceptance</span>
                        </div>
                        <p className="text-gray-600">{breeder.policies.auto_accept_orders ? 'Auto-accept' : 'Manual review'}</p>
                    </div>
                </div>
            </section>

            {/* Contact Information - Placeholder as not in the provided types */}
            {/* <section className="mt-6 mb-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
        <div className="space-y-3">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-blue-500" />
            <span className="ml-3 text-gray-600">Contact via platform messaging</span>
          </div>
          <div className="flex items-center">
            <Phone className="w-5 h-5 text-blue-500" />
            <span className="ml-3 text-gray-600">Phone number available after purchase</span>
          </div>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md font-medium text-white transition duration-200 flex items-center justify-center">
            <Mail className="w-4 h-4 mr-2" />
            Contact Seller
          </button>
        </div>
      </section> */}
        </div>
    )
}

export default BreedersProfile