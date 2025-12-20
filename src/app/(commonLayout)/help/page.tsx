import React from "react";

const HelpPage = () => {
  const topics = [
    "Account & Profile",
    "Booking & Travel Plans",
    "Safety & Guidelines",
    "Payments & Subscriptions",
    "Technical Issues",
  ];

  return (
    <section className="min-h-screen py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Help Center</h1>
        <p className="text-center text-gray-600 mb-12">
          Find guides and answers to common questions about using Travel Buddy.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {topics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-xl mb-2">{topic}</h3>
              <p className="text-gray-600">
                Click to explore articles and guides about {topic.toLowerCase()}.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HelpPage;
