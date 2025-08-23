'use client';

// import BackButton from '@/app/components/BackButton/BackButton';
import Footer from '@/app/components/Footer/Footer';
import Header from '@/app/components/Header/Header';
import React from 'react';
import { Mail, Lock } from 'lucide-react';

interface PolicySectionProps {
  title: string;
  content: string;
  sectionNumber: number;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, content, sectionNumber }) => {
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
  const policyData = [
    {
      title: "Information We Collect",
      content: "We collect customer details such as name, email, phone number, and address to process orders and provide services."
    },
    {
      title: "Use of Information",
      content: "To process and deliver orders. To communicate updates, offers, and support. To improve our website and customer experience."
    },
    {
      title: "Data Protection",
      content: "Your personal data is stored securely and is not shared with third parties except for payment processing and logistics."
    },
    {
      title: "Cookies",
      content: "Our website may use cookies to enhance browsing experience."
    },
    {
      title: "Contact",
      content: "For concerns regarding privacy, write to us at fincarts.services@gmail.com"
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
                <Lock className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Learn how we collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy Statement</h2>
          <p className="text-gray-700 leading-relaxed">
            At Fincarts, we are committed to protecting your privacy and maintaining the confidentiality of your personal information. 
            This policy outlines how we collect, use, and protect your data.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Our Privacy Practices</h2>
          {policyData.map((policy, index) => (
            <PolicySection
              key={index}
              title={policy.title}
              content={policy.content}
              sectionNumber={index + 1}
            />
          ))}
        </div>

        {/* Data Security */}
        {/* <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-900">Data Security</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction. Your data is encrypted and stored on secure servers.
          </p>
        </div> */}

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            If you have any questions or concerns about our privacy policy or how we handle your data, 
            please contact our privacy team.
          </p>
          <a
            href="mailto:fincarts.services@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <Mail className="h-5 w-5 mr-2" />
            Contact Privacy Team
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