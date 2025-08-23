'use client';

// import BackButton from '@/app/components/BackButton/BackButton';
import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';
import React from 'react';
import { Truck, Clock, CreditCard, MapPin, AlertCircle } from 'lucide-react';

interface PolicySectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const PolicySection: React.FC<PolicySectionProps> = ({ icon, title, content }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div className="py-6 px-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const policyData = [
    {
      icon: <Clock size={24} />,
      title: "Order Processing",
      content: "All confirmed orders are processed within 1–2 business days."
    },
    {
      icon: <Truck size={24} />,
      title: "Delivery Timelines",
      content: "Delivery is usually completed within 1-2 business days depending on the shipping location. Remote locations may require additional time."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Shipping Charges",
      content: "Applicable shipping charges will be displayed at checkout before the order is confirmed."
    },
    {
      icon: <MapPin size={24} />,
      title: "Tracking",
      content: "Once your order has been shipped, a tracking number will be shared via email or SMS."
    },
    {
      icon: <AlertCircle size={24} />,
      title: "Delays",
      content: "While we strive for timely delivery, external factors (courier delays, weather, etc.) may affect timelines. Customers will be informed promptly in such cases."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* <BackButton /> */}
          <div className="text-center mt-12">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Shipping Policy
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our shipping process, timelines, and policies.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Policy Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {policyData.map((policy, index) => (
            <PolicySection
              key={index}
              icon={policy.icon}
              title={policy.title}
              content={policy.content}
            />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have Questions About Shipping?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you have any questions about our shipping policy or need assistance with your order, our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:fincarts.services@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Contact Support
            </a>
            {/* <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium">
              Track Your Order
            </button> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;