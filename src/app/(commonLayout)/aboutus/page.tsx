import React from "react";

const AboutPage = () => {
  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Travel Buddy
          </h1>
          <p className="text-lg text-gray-600">
            Connecting travelers, creating memories, and turning journeys into shared adventures.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🌍 Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Travel Buddy is built to help solo travelers and explorers find like-minded companions.
            We believe travel is more meaningful when shared — whether it’s discovering new places,
            planning trips together, or meeting fellow travelers along the way.
          </p>
        </div>

        {/* What We Do */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              ✈️ What We Do
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our platform allows travelers to create travel plans, explore upcoming trips,
              and connect with others heading to the same destination. From casual meetups
              to full travel companionship, Travel Buddy makes it simple and safe.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              🤝 Why Travel Buddy
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Traveling alone doesn’t mean being lonely. Travel Buddy focuses on trust,
              verified profiles, and meaningful connections—so you can focus on enjoying
              the journey, not worrying about it.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            💡 Our Core Values
          </h2>

          <ul className="grid md:grid-cols-3 gap-6 text-gray-600">
            <li>
              <span className="font-medium text-gray-800">Trust & Safety</span><br />
              Building a secure and respectful community.
            </li>
            <li>
              <span className="font-medium text-gray-800">Community</span><br />
              Encouraging meaningful connections between travelers.
            </li>
            <li>
              <span className="font-medium text-gray-800">Adventure</span><br />
              Inspiring people to explore beyond boundaries.
            </li>
          </ul>
        </div>

        {/* Closing */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            Join the Journey 🌟
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Whether you’re planning your next trip or looking for a travel companion,
            Travel Buddy is here to make your journey unforgettable.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;
