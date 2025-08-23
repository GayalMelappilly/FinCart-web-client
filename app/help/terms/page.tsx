'use client';

// import BackButton from '@/app/components/BackButton/BackButton';
import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';
import React from 'react';
import { FileText } from 'lucide-react';

interface TermsSectionProps {
  title: string;
  content: string;
  sectionNumber: number;
}

const TermsSection: React.FC<TermsSectionProps> = ({ title, content, sectionNumber }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {sectionNumber}
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="ml-11">
        <p className="text-gray-700 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};

const Page: React.FC = () => {
  const termsData = [
    {
      title: "General",
      content: "By using our website, you agree to comply with these Terms and Conditions."
    },
    {
      title: "Products & Services",
      content: "We strive to ensure accuracy in product descriptions and pricing. However, errors may occur, and we reserve the right to correct them."
    },
    {
      title: "Payments",
      content: "All payments are processed securely through Razorpay. Orders will be dispatched only after successful payment confirmation."
    },
    {
      title: "Cancellations",
      content: "Customers may cancel orders within 24 hours of placing them. After this, cancellations may not be possible once shipping has been initiated."
    },
    {
      title: "Governing Law",
      content: "These terms are governed by Indian law and subject to the jurisdiction of Kerala courts."
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
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Please read these terms and conditions carefully before using our services.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms and Conditions govern your use of our website and services. By accessing or using our platform, 
            you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Terms of Service</h2>
          {termsData.map((term, index) => (
            <TermsSection
              key={index}
              title={term.title}
              content={term.content}
              sectionNumber={index + 1}
            />
          ))}
        </div>

        {/* Important Notice */}
        {/* <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Scale className="h-6 w-6 text-amber-600" />
            <h3 className="text-xl font-semibold text-gray-900">Legal Compliance</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            By continuing to use our services, you confirm that you are legally capable of entering into binding contracts 
            and that you agree to comply with all applicable laws and regulations.
          </p>
        </div> */}

        {/* Key Points */}
        {/* <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Secure Payments</h3>
            </div>
            <p className="text-gray-600 text-sm">
              All transactions are processed through Razorpay with industry-standard security measures.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">24-Hour Cancellation</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Orders can be cancelled within 24 hours of placement, subject to shipping status.
            </p>
          </div>
        </div> */}

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about these Terms and Conditions, 
            please don&apos;t hesitate to contact our support team.
          </p>
          <a
            href="mailto:fincarts.services@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Contact Support
          </a>
        </div>

        {/* Last Updated */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div> */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;