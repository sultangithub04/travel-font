"use client";

import { useState } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateTravelPlanModal() {
   const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budgetRange: "",
    travelType: "SOLO",
    description: "",
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userInformation = await getUserInfo();
    const emailFromsession = userInformation?.email
    const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromsession}`)
    const { data:userInfo } = await resultData.json()

    const payload = {
      userId: userInfo?.id,
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/travel-plans`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create travel plan");

      toast.success("Travel plan created successfully!");
      setFormData({
        title: "",
        destination: "",
        startDate: "",
        endDate: "",
        budgetRange: "",
        travelType: "SOLO",
        description: "",
      });
      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
      >
        Add Travel Plan
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-neutral-800 w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Create Travel Plan</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Cox's Bazar"
                  required
                  className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="destination">Destination</label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Cox's Bazar 11"
                  required
                  className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="startDate">Start Date</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="endDate">End Date</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="budgetRange">Budget Range</label>
                <input
                  type="text"
                  id="budgetRange"
                  name="budgetRange"
                  value={formData.budgetRange}
                  onChange={handleChange}
                  placeholder="10000 - 20000 BDT"
                  required
                  className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="travelType">Travel Type</label>
                <select
                  id="travelType"
                  name="travelType"
                  value={formData.travelType}
                  onChange={handleChange}
                  className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
                >
                  <option value="SOLO">Solo</option>
                  <option value="FAMILY">Family</option>
                  <option value="FRIENDS">Friends</option>
                  <option value="GROUP">Group</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="A family trip to the beach."
                  className="w-full rounded-md border px-3 py-2 focus:ring focus:ring-teal-200"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-medium py-2 rounded-md hover:bg-teal-700 transition"
              >
                Create Travel Plan
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

