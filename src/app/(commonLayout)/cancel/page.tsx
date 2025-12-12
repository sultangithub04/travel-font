"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ❌ Payment Cancelled
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          Your payment was not completed.  
          You can retry anytime.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Return Home
          </Link>

          <Link
            href="/travel-plans"
            className="px-6 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            Retry Payment
          </Link>
        </div>
      </div>
    </div>
  );
}
