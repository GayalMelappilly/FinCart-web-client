'use client'

import React, { FC } from 'react';
import { Star, Package, TrendingDown } from 'lucide-react';

interface WholesaleProduct {
  id: number;
  name: string;
  category: string;
  minOrder: number;
  unitPrice: number;
  bulkPrice: number;
  imageUrl: string;
  availability: string;
  rating: number;
  supplier: string;
  description?: string;
}

interface WholesaleCardProps {
  product: WholesaleProduct;
}

const WholesaleCard: FC<WholesaleCardProps> = ({ product }) => {
  const discountPercentage = Math.round(((product.unitPrice - product.bulkPrice) / product.unitPrice) * 100);
  
  const getAvailabilityColor = (availability: string) => {
    switch (availability.toLowerCase()) {
      case 'in stock':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'low stock':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out of stock':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={`${index < Math.floor(rating) 
          ? 'text-yellow-400 fill-current' 
          : index === Math.floor(rating) && rating % 1 !== 0
          ? 'text-yellow-400 fill-current opacity-50'
          : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif' font-size='16' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
          }}
        />
        
        {/* Wholesale Badge */}
        <div className="absolute top-3 right-3 px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md shadow-sm">
          WHOLESALE
        </div>

        {/* Minimum Order Badge */}
        <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-md shadow-sm border border-gray-200">
          <Package size={12} className="inline mr-1" />
          Min: {product.minOrder}
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded-md shadow-sm">
            <TrendingDown size={12} className="inline mr-1" />
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Category Tag */}
        <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-3">
          {product.category}
        </div>

        {/* Pricing Section */}
        <div className="bg-gray-50 rounded-lg p-3 mb-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Unit Price */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Unit Price</p>
              <p className="text-sm font-medium text-gray-900">
                ₹{product.unitPrice.toFixed(2)}
              </p>
            </div>
            
            {/* Bulk Price */}
            <div>
              <p className="text-xs text-gray-500 mb-1">Bulk Price</p>
              <p className="text-lg font-bold text-blue-600">
                ₹{product.bulkPrice.toFixed(2)}
              </p>
            </div>
          </div>
          
          {/* Savings */}
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-green-600 font-medium">
              Save ₹{(product.unitPrice - product.bulkPrice).toFixed(2)} per unit
            </p>
          </div>
        </div>

        {/* Rating and Availability */}
        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600 ml-1">
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Availability Status */}
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getAvailabilityColor(product.availability)}`}>
            {product.availability}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors duration-200">
            Place order
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors duration-200">
            Details
          </button>
        </div>

        {/* Bulk Benefits */}
        {/* <div className="mt-3 p-2 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700 font-medium mb-1">Bulk Benefits:</p>
          <ul className="text-xs text-blue-600 space-y-0.5">
            <li>• Free shipping on orders over $500</li>
            <li>• Extended warranty coverage</li>
            <li>• Priority customer support</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default WholesaleCard;