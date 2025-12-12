"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-10 text-center">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Thank you for completing your payment.  
          Your subscription has been activated successfully.
        </p>

        <Link
          href="/"
          className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
