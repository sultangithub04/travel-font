import React from "react";

const TermsPage = () => {
  return (
    <section className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>

        <p className="text-gray-600 mb-4">
          Welcome to Travel Buddy! By using our platform, you agree to comply with these Terms of Service.
        </p>
        <ol className="list-decimal list-inside space-y-4 text-gray-600">
          <li><strong>Acceptance of Terms:</strong> Using Travel Buddy means you agree to these terms and any updates.</li>
          <li><strong>Account Responsibility:</strong> Keep your account secure. You are responsible for all activity under your account.</li>
          <li><strong>Travel Plans & Bookings:</strong> Travel Buddy is a platform for connecting travelers. We do not provide travel insurance or guarantees.</li>
          <li><strong>User Conduct:</strong> Be respectful. Harassment, scams, or unsafe behavior is prohibited.</li>
          <li><strong>Modifications:</strong> Travel Buddy may update terms at any time. Continued use means you accept changes.</li>
        </ol>
      </div>
    </section>
  );
};

export default TermsPage;
