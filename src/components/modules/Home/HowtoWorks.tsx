"use client";


import { User, Calendar, Users } from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <User size={36} className="text-teal-600" />,
    title: "Sign Up",
    description:
      "Create your account with email and password. Set up your traveler profile.",
  },
  {
    id: 2,
    icon: <Calendar size={36} className="text-teal-600" />,
    title: "Create Travel Plan",
    description:
      "Add your upcoming trips including destination, dates, budget, and travel type.",
  },
  {
    id: 3,
    icon: <Users size={36} className="text-teal-600" />,
    title: "Find travaller",
    description:
      "Discover travelers with similar plans and interests. Send match requests and connect!",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Simple 3-step process to find your perfect travel buddy
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}     
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8 text-center border border-gray-200 dark:border-neutral-700"
            >
              <div className="flex justify-center mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
