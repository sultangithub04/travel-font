
import Image from "next/image";
import Link from "next/link";



const FeaturedTravelers = async () => {

  const res = await fetch("http://localhost:5000/api/users");
  const responseData = await res.json();
  const travelers = responseData?.data;

  
  return (
    <section className="py-16 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-teal-600 dark:text-teal-400">
            Featured Travelers
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Meet experienced explorers ready to share journeys
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelers.slice(0, 3).map((traveler) => (
            <div
              key={traveler.id}

              className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-neutral-700"
            >
              {/* Image */}
              <div className="relative w-full h-56">
                <Image
                  src={traveler.profilePhoto}
                  alt={traveler.name}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold">{traveler.name}</h3>
                <p className="text-sm text-gray-500">{traveler.address}</p>
                <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm line-clamp-2">
                  {traveler.bio}
                </p>

                <Link
                  href={`/explore/${traveler.id}`}
                  className="block mt-4 text-teal-600 hover:underline font-medium"
                >
                  View Profile →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA explore all */}
        <div className="text-center mt-10">
          <Link
            href="/explore"
            className="px-6 py-3 bg-teal-600 rounded-lg text-white hover:bg-teal-700 transition-all shadow-md"
          >
            Explore More Travelers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTravelers;
