'use client';

// import BackButton from '@/app/components/BackButton/BackButton';
import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';
import React from 'react';
import { RefreshCw, CheckCircle, XCircle, CreditCard } from 'lucide-react';

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
      icon: <CheckCircle size={24} />,
      title: "Eligibility for Refunds",
      content: "Products may be refunded if found dead (DOA), damaged, or incorrectly delivered. A video of the unboxing should be provided for a full refund. Death after leaving the fish in your tank is not our responsibility."
    },
    {
      icon: <XCircle size={24} />,
      title: "Non-Returnable Items",
      content: "Live fishes, perishable goods, and customized orders are not eligible for return, you can either choose refund or replacement with proof of unboxing."
    },
    {
      icon: <RefreshCw size={24} />,
      title: "Refund Process",
      content: "To initiate a refund, please contact us at 9961438100. Once approved, if the fault is from the seller or from the transport system, you are eligible for a full refund or replacement."
    },
    {
      icon: <CreditCard size={24} />,
      title: "Refunds",
      content: "Refunds for eligible returns will be processed within 1-2 business days to the original payment method."
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
              Returns &amp; Refunds Policy
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our returns, refunds, and replacement policies.
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

        {/* Important Notice */}
        {/* <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-amber-900 mb-2">
                Important Notice
              </h3>
              <p className="text-amber-800 leading-relaxed">
                For all refund and return requests, please ensure you have an unboxing video ready as proof. 
                This helps us process your request quickly and ensures you get the best service possible.
              </p>
            </div>
          </div>
        </div> */}

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need to Request a Return or Refund?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you need to initiate a return or refund, or have any questions about our policy, 
            our customer support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:9961438100"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Call Us: 9961438100
            </a>
            <a
              href="mailto:fincarts.services@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;