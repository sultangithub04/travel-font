/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateReviewModal from "@/components/modules/modal/CreateReviewModal";
import ReviewDeleteModal from "@/components/modules/modal/ReviewdeleteModal";
import ReviewEditModal from "@/components/modules/modal/ReviewEditModal";

import Image from "next/image";

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // AM/PM দেখাবে
  });
};



export default async function TravelPlanDetailsPage({ params }: { params: Promise<{ planid: string }> }) {

  const { planid } = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/travel-plans/${planid}`);
  const responseData = await res.json();
  const mockPlan = responseData?.data;

  return (
    <div className="min-h-screen py-10 px-4 max-w-4xl mx-auto">
      {/* Plan Title */}
      <h1 className="text-4xl font-bold text-teal-600 mb-4">{mockPlan.title}</h1>

      {/* Traveler Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-teal-500">
          <Image
            src={mockPlan.user.traveller.profilePhoto}
            alt={mockPlan.user.name}
            fill
            sizes="100%"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-lg">{mockPlan.user.name}</p>
          <p className="text-sm text-gray-500">{mockPlan.user.address}</p>
        </div>
      </div>

      {/* Plan Details */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-6 mb-6 border border-gray-200 dark:border-neutral-700">
        <p>
          <span className="font-medium">Destination:</span> {mockPlan.destination}
        </p>
        <p>
          <p>
            <span className="font-medium">Dates:</span>{" "}
            {formatDate(mockPlan.startDate)} - {formatDate(mockPlan.endDate)}
          </p>
        </p>
        <p>
          <span className="font-medium">Budget:</span> {mockPlan.budgetRange}
        </p>
        <p>
          <span className="font-medium">Travel Type:</span> {mockPlan.travelType}
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{mockPlan.description}</p>
      </div>

      {/* Add Review Button */}

      <CreateReviewModal planId={mockPlan.id} planOwnerId={mockPlan.user.id} />

      {/* Reviews Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {mockPlan.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          mockPlan.reviews.map((review:any) => (
            <div
              key={review.id}
              className="mb-4 p-4 border border-gray-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800"
            >
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-sm text-gray-500 mb-2">{formatDateTime(review.createdAt)}</p>

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

              <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>

              <div className="flex gap-2 mt-2">
                <ReviewEditModal
                  reviewId={review.id}
                  currentRating={review.rating}
                  currentComment={review.comment}
                />

                <ReviewDeleteModal id={review.id} />
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
