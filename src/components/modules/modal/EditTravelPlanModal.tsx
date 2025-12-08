/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

export default function EditTravelPlanModal({ plan }: { plan: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: plan?.title || "",
    destination: plan?.destination || "",
    startDate: plan?.startDate?.slice(0, 10) || "",
    endDate: plan?.endDate?.slice(0, 10) || "",
    budgetRange: plan?.budgetRange || "",
    travelType: plan?.travelType || "SOLO",
    description: plan?.description || "",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/travel-plans/${plan?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startDate: new Date(formData.startDate).toISOString(),
          endDate: new Date(formData.endDate).toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to update travel plan");

      toast.success("Successfully updated travel plan!");
      setIsOpen(false);
      window.location.reload(); // Refresh page
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all text-sm"
      >
        <Pencil size={16} />
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-neutral-800 w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Travel Plan</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label>Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input-style"
                />
              </div>

              <div>
                <label>Destination</label>
                <input
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className="input-style"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>

                <div>
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>
              </div>

              <div>
                <label>Budget</label>
                <input
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  className="input-style"
                />
              </div>

              <div>
                <label>Travel Type</label>
                <select
                  name="travelType"
                  value={formData.travelType}
                  onChange={handleChange}
                  className="input-style"
                >
                  <option value="SOLO">Solo</option>
                  <option value="FAMILY">Family</option>
                  <option value="FRIENDS">Friends</option>
                  <option value="GROUP">Group</option>
                </select>
              </div>

              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="input-style"
                />
              </div>

              <button type="submit" className="w-full bg-yellow-600 text-white py-2 rounded-lg">
                Update Travel Plan
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
