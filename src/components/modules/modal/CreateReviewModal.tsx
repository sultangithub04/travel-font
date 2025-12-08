/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateReviewModal({ planId, planOwnerId }: { planId: number, planOwnerId: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userInformation = await getUserInfo();
      const emailFromSession = userInformation?.email;

      // Get user info
      const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromSession}`);
      const { data: userInfo } = await resultData.json();

      const payload = {
        reviewerId: userInfo?.id,
        revieweeId: planOwnerId, // <--- এখানে correct owner ID
        planId,
        rating: Number(formData.rating),
        comment: formData.comment,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create review");

      toast.success("Review submitted successfully!");
      setFormData({ rating: 5, comment: "" });
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
      >
        Add Review
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-neutral-800 w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Review</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Write your review here..."
                  className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-medium py-2 rounded-md hover:bg-teal-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
