import { getUserInfo } from "@/services/auth/getUserInfo";
import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserProfile = async () => {
  const userInfo = await getUserInfo();
  const emailFromsession= userInfo?.email
 
  const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromsession}`)
  const { data } = await resultData.json()
  const user= data?.traveller


  console.log(user);
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

        {data.travelPlans?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.travelPlans.map((plan: any) => (
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

        {data.reviewsReceived?.length > 0 ? (
          <div className="space-y-4">
            {data.reviewsReceived.map((review: any) => (
              <div
                key={review.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow p-4 border border-gray-200 dark:border-neutral-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">
                    Reviewer ID: {review.reviewerId}
                  </h3>
                  <div className="flex items-center">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400" />
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
