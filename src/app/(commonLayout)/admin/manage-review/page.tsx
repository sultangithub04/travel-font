"use client";

import React, { useState } from "react";
import { toast } from "sonner";


type ReviewStatus = "approved" | "pending" | "rejected";

interface ReviewType {
  _id: string;
  userName: string;
  message: string;
  rating: number;
  status: ReviewStatus;
  createdAt: string;
}

const ReviewList = () => {
  const [reviews, setReviews] = useState<ReviewType[]>([
    {
      _id: "1",
      userName: "John Doe",
      message: "Great plan! Enjoyed a lot.",
      rating: 5,
      status: "pending",
      createdAt: "2025-02-10T10:30:00Z",
    },
    {
      _id: "2",
      userName: "Sarah Parker",
      message: "Good value for money!",
      rating: 4,
      status: "approved",
      createdAt: "2025-02-05T16:15:00Z",
    },
    {
      _id: "3",
      userName: "Mark Lee",
      message: "Needs improvement",
      rating: 3,
      status: "rejected",
      createdAt: "2025-02-01T09:00:00Z",
    },
  ]);

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const updateStatus = (
    id: string,
    status: "approved" | "pending" | "rejected"
  ) => {
    setReviews((prev) =>
      prev.map((review) =>
        review._id === id ? { ...review, status } : review
      )
    );

    toast.success(`Review marked as ${status}`);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((review) => review._id !== id));
    toast.success("Review deleted");
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-3">Reviews</h2>

      {reviews?.length === 0 && (
        <p className="text-gray-500">No reviews found</p>
      )}

      {reviews.map((review) => (
        <div
          key={review._id}
          className="border shadow-sm rounded-md p-4 flex justify-between items-start bg-white"
        >
          <div>
            <p className="font-semibold">{review.userName}</p>
            <p className="text-gray-700">{review.message}</p>

            <p className="text-sm text-gray-500">
              Rating: ⭐ {review.rating}/5
            </p>

            <p className="text-xs text-gray-400">
              {formatDateTime(review.createdAt)}
            </p>

            <span
              className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                review.status === "approved"
                  ? "bg-green-200 text-green-800"
                  : review.status === "pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {review.status}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <select
              className="border px-2 py-1 rounded text-sm"
              value={review.status}
              onChange={(e) =>
                updateStatus(
                  review._id,
                  e.target.value as ReviewStatus
                )
              }
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              onClick={() => deleteReview(review._id)}
              className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
