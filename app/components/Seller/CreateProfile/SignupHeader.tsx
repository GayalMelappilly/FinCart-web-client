// components/seller/SignupHeader.tsx
import Link from 'next/link';

export default function SignupHeader() {
  return (
    <div className="text-center mb-8">
      <Link href="/" className="inline-block">
        <h1 className="text-3xl font-bold text-blue-600">Fincarts</h1>
      </Link>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Sell with us</h2>
      <p className="text-gray-600 mt-2">
        Join our marketplace and reach thousands of aquarium enthusiasts
      </p>
    </div>
  );
}