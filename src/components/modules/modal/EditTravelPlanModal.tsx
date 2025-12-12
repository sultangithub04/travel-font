/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

export default function EditTravelPlanModal({ plan }: { plan: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: plan?.title || "",
    destination: plan?.destination || "",
    startDate: plan?.startDate?.slice(0, 10) || "",
    endDate: plan?.endDate?.slice(0, 10) || "",
    budgetMin: plan?.budgetMin || 0,
    budgetMax: plan?.budgetMax || 0,
    travelType: plan?.travelType || "SOLO",
    description: plan?.description || "",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "budgetMin" || name === "budgetMax" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/travel-plans/${plan?.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            startDate: new Date(formData.startDate).toISOString(),
            endDate: new Date(formData.endDate).toISOString(),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update travel plan");

      toast.success("Successfully updated travel plan!");
      setIsOpen(false);
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all shadow-md text-sm font-medium"
      >
        <Pencil size={16} />
        Edit
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-800 w-full max-w-2xl p-8 rounded-xl shadow-2xl relative animate-fadeIn">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-black transition"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Edit Travel Plan
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Destination
                  </label>
                  <input
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Budget Min
                  </label>
                  <input
                    type="number"
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Budget Max
                  </label>
                  <input
                    type="number"
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Travel Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Travel Type
                </label>
                <select
                  name="travelType"
                  value={formData.travelType}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                >
                  <option value="SOLO">Solo</option>
                  <option value="FAMILY">Family</option>
                  <option value="FRIENDS">Friends</option>
                  <option value="GROUP">Group</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 focus:ring-2 focus:ring-teal-400 focus:outline-none dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-lg shadow-md transition"
              >
                Update Travel Plan
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
