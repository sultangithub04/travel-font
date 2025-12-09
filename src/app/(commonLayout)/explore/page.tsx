"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const Explore = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search States
  const [searchName, setSearchName] = useState("");
  const [searchAddress, setSearchAddress] = useState("");

  // 🔥 NEW: Travel type filter state
  const [searchTravelType, setSearchTravelType] = useState("");

  useEffect(() => {
    const fetchTravelers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, {
          cache: "no-store",
        });

        const responseData = await res.json();
        setResults(responseData?.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTravelers();
  }, []);

  // FILTER LOGIC
  const filteredResults = results.filter((traveler: any) => {
    const matchName = traveler?.name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());

    const matchAddress = traveler?.address
      ?.toLowerCase()
      .includes(searchAddress.toLowerCase());

    // 🔥 CHECK travelType MATCH
    const matchTravelType =
      searchTravelType === "" ||
      traveler?.travelPlans?.some(
        (plan: any) =>
          plan.travelType?.toLowerCase() === searchTravelType.toLowerCase()
      );

    return matchName && matchAddress && matchTravelType;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Explore Travelers</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by Name..."
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by Address..."
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />

        {/* 🔥 Travel Type Filter Select */}
        <select
          className="border border-gray-300 p-3 rounded-lg w-full"
          value={searchTravelType}
          onChange={(e) => setSearchTravelType(e.target.value)}
        >
          <option value="">Filter by Travel Type</option>
          <option value="friends">Friends</option>
          <option value="gorup">Gorup</option>
          <option value="solo">Solo</option>
          <option value="family">Family</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResults.map((traveler: any) => (
            <div
              key={traveler.id}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-teal-500">
                  <Image
                    src={traveler?.profilePhoto}
                    alt={traveler?.name}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{traveler.name}</h3>
                  <p className="text-sm text-gray-500">{traveler?.email}</p>
                  <p className="text-sm text-gray-500">{traveler?.address}</p>
                  <p className="text-sm text-teal-600 font-medium mt-1">
                    {traveler?.travelPlans?.map((plan: any) => (
                      <span
                        key={plan._id}
                        className="px-2 py-1 bg-teal-100 text-teal-700 rounded-md mr-2"
                      >
                        {plan.travelType}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <Link
                href={`/explore/${traveler.id}`}
                className="inline-block mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all text-sm"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No travelers found.</p>
      )}
    </div>
  );
};

export default Explore;
