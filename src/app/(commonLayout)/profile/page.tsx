/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserProfile = async () => {
  const userInfo = await getUserInfo();
  const emailFromsession = userInfo?.email

  const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromsession}`, { cache: "no-store" })
  const { data } = await resultData.json()
  console.log(data);
  const user = data?.traveller
  console.log(user);
  const myPlan = user?.travelPlans

  console.log(myPlan);
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-teal-500">
          <Image
            src={user.profilePhoto}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
          <p className="mt-2 text-gray-700">{user.bio || "No bio available"}</p>

          <div className="mt-2 text-sm text-gray-600">
            <p><strong>Travel Interests:</strong> {user.travelInterests ?? "N/A"}</p>
            <p><strong>Visited Countries:</strong> {user.visitedCountries ?? "N/A"}</p>
            <p><strong>Current Location:</strong> {user.currentLocation ?? "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Travel Plans */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Upcoming Travel Plans</h2>

        {myPlan?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myPlan?.map((plan: any) => (
              <div
                key={plan.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-neutral-700"
              >
                <h3 className="font-semibold text-lg">{plan.destination}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  <Calendar size={16} className="inline mr-1" />
                  {new Date(plan.startDate).toLocaleDateString()} → {new Date(plan.endDate).toLocaleDateString()}
                </p>

                <Link
                  href={`/travel-plans/${plan.id}`}
                  className="mt-2 inline-block px-3 py-1 text-white bg-teal-600 rounded hover:bg-teal-700 text-sm"
                >
                  View Plan
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No upcoming travel plans.</p>
        )}
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Reviews Received</h2>

        {user.reviewsReceived?.length > 0 ? (
          <div className="space-y-4">
            {user.reviewsReceived.map((review: any) => (
              <div
                key={review.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4 border border-gray-200 dark:border-neutral-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">
                    Reviewer ID: {review.reviewerId}
                  </h3>
                  <div className="flex items-center mb-2">
                    {Array.from({ length: review.rating }).map((_, idx) => (
                      <svg
                        key={idx}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
      3.966a1 1 0 00.95.69h4.174c.969 
      0 1.371 1.24.588 1.81l-3.381 
      2.455a1 1 0 00-.364 1.118l1.287 
      3.966c.3.921-.756 1.688-1.54 
      1.118L10 15.347l-3.381 2.455c-.783 
      .57-1.838-.197-1.539-1.118l1.287-3.966a1 
      1 0 00-.364-1.118L2.62 9.393c-.783 
      -.57-.38-1.81.588-1.81h4.174a1 1 0 
      00.95-.69l1.286-3.966z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews received yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
