/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditReviewModalProps {
  reviewId: string;
  currentRating: number;
  currentComment: string;
}

export default function EditReviewModal({
  reviewId,
  currentRating,
  currentComment,
}: EditReviewModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    rating: currentRating,
    comment: currentComment,
  });

  useEffect(() => {
    setFormData({ rating: currentRating, comment: currentComment });
  }, [currentRating, currentComment]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userInformation = await getUserInfo();
      const emailFromSession = userInformation?.email;

      const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromSession}`,{ cache: "no-store" });
      const { data: userInfo } = await resultData.json();

      const payload = {
        reviewerId: userInfo?.traveller.id,
        rating: Number(formData.rating),
        comment: formData.comment,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update review");

      toast.success("Review updated successfully!");
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit Review
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogDescription>Update your rating and comment for this review.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="rating">Rating</label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>{num} Star{num > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={3}
              placeholder="Update your review..."
              className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-600 text-white font-medium py-2 rounded-md hover:bg-teal-700 transition"
          >
            Update Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
