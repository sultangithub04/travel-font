import React from "react";

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I find a travel companion?",
      answer: "Simply create a travel plan and browse other travelers heading to the same destination. Send them a connection request to start chatting.",
    },
    {
      question: "Is Travel Buddy safe?",
      answer: "Yes! All users are verified, and we encourage respectful interactions. Always follow local travel guidelines.",
    },
    {
      question: "Can I cancel my travel plan?",
      answer: "Yes, you can cancel a travel plan anytime from your dashboard. Refund policies depend on the plan and payment method.",
    },
    {
      question: "Do I need a subscription?",
      answer: "Basic access is free. Some features, like premium meetups or priority connections, require a subscription.",
    },
  ];

  return (
    <section className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6">
              <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
