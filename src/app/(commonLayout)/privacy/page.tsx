import React from "react";

const PrivacyPage = () => {
  return (
    <section className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <p className="text-gray-600 mb-4">
          Travel Buddy values your privacy. This policy explains how we collect, use, and protect your information.
        </p>

        <ul className="list-disc list-inside space-y-4 text-gray-600">
          <li><strong>Information Collection:</strong> We collect information you provide, such as profile details, travel plans, and preferences.</li>
          <li><strong>Usage:</strong> Your information helps us provide personalized recommendations, connect travelers, and improve our platform.</li>
          <li><strong>Sharing:</strong> We do not sell your data. We only share information with trusted partners for platform functionality.</li>
          <li><strong>Security:</strong> We implement industry-standard security measures to protect your data.</li>
          <li><strong>Cookies & Tracking:</strong> We may use cookies to improve your experience on our platform.</li>
        </ul>

        <p className="mt-6 text-gray-600">
          By using Travel Buddy, you consent to this Privacy Policy. We may update it periodically, and updates will be posted here.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPage;
