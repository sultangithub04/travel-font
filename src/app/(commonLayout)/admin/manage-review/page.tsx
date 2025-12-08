"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

type ReviewType = {
  _id: string;
  user: { name: string; email: string };
  rating: number;
  comment: string;
  status: "approved" | "pending" | "rejected";
  createdAt: string;
  travelPlan: {
    title: string;
    destination: string;
  };
};

// MOCK DATA
const MOCK_REVIEWS: ReviewType[] = [
  {
    _id: "r1",
    user: { name: "Rakib Hasan", email: "rakib@example.com" },
    rating: 4,
    comment: "Very enjoyable trip, recommended!",
    status: "pending",
    createdAt: "2025-01-12T09:30:00.000Z",
    travelPlan: {
      title: "Cox’s Bazar Tour",
      destination: "Cox’s Bazar",
    },
  },
  {
    _id: "r2",
    user: { name: "Sara Khan", email: "sara@example.com" },
    rating: 5,
    comment: "Amazing experience with friends!",
    status: "approved",
    createdAt: "2024-12-20T10:00:00.000Z",
    travelPlan: {
      title: "Saint Martin Trip",
      destination: "Saint Martin",
    },
  },
  {
    _id: "r3",
    user: { name: "Mahidul Islam", email: "mahid@example.com" },
    rating: 3,
    comment: "Good place, but service was slow.",
    status: "rejected",
    createdAt: "2024-11-15T12:00:00.000Z",
    travelPlan: {
      title: "Sajek Valley",
      destination: "Sajek",
    },
  },
];

export default function ManageReviewsPage() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);

    /// 🔥 MOCK API SIMULATION
    setTimeout(() => {
      setReviews(MOCK_REVIEWS);
      setLoading(false);
    }, 1000);
  };

  const updateStatus = async (id: string, status: string) => {
    const updatedList = reviews.map((review) =>
      review._id === id ? { ...review, status } : review
    );

    setReviews(updatedList);
    toast.success(`Review marked as ${status}`);
  };

  const deleteReview = async (id: string) => {
    const updatedList = reviews.filter((review) => review._id !== id);
    setReviews(updatedList);
    toast.success("Review deleted");
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Reviews</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews available</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review._id}>
              <CardContent className="flex flex-col md:flex-row justify-between items-center p-4 gap-4">

                {/* LEFT SIDE DATA */}
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-lg">{review.user?.name}</p>
                  <p className="text-sm">{review.user?.email}</p>

                  <p className="mt-2">
                    <span className="font-medium">Rating:</span> ⭐ {review.rating}/5
                  </p>

                  <p className="text-sm text-gray-700 italic">
                    "{review.comment}"
                  </p>

                  <p className="text-xs text-muted-foreground mt-2">
                    Plan: {review.travelPlan?.title} ({review.travelPlan?.destination})
                  </p>

                  <p className="text-xs text-gray-500">
                    Date: {new Date(review.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-xs font-semibold">
                    Status:{" "}
                    <span
                      className={
                        review.status === "approved"
                          ? "text-green-600"
                          : review.status === "rejected"
                          ? "text-red-600"
                          : "text-orange-500"
                      }
                    >
                      {review.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => updateStatus(review._id, "approved")}
                    className="flex items-center gap-1"
                  >
                    <Check size={16} /> Approve
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => updateStatus(review._id, "rejected")}
                    className="flex items-center gap-1 text-red-500"
                  >
                    <X size={16} /> Reject
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => deleteReview(review._id)}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
