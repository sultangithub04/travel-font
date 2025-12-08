"use client";

import { useEffect, useState } from "react";
import { Loader2, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type StatusType = "approved" | "pending" | "rejected";

type TravelPlanType = {
  _id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budgetRange: string;
  status: StatusType;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
};

// ⭐ Mock Data
const MOCK_PLANS: TravelPlanType[] = [
  {
    _id: "mock1",
    title: "Family Trip to Cox's Bazar",
    destination: "Cox's Bazar",
    startDate: "2025-01-10T00:00:00.000Z",
    endDate: "2025-01-15T00:00:00.000Z",
    budgetRange: "15,000 - 25,000 BDT",
    status: "pending",
    createdAt: "2025-01-05T12:20:00.000Z",
    user: { name: "James Carter", email: "james@gmail.com" },
  },
  {
    _id: "mock2",
    title: "Friends Trip to Bali",
    destination: "Bali, Indonesia",
    startDate: "2025-03-01T00:00:00.000Z",
    endDate: "2025-03-08T00:00:00.000Z",
    budgetRange: "60,000 - 90,000 BDT",
    status: "approved",
    createdAt: "2025-02-15T09:40:00.000Z",
    user: { name: "Sophia Lee", email: "sophia@mail.com" },
  },
  {
    _id: "mock3",
    title: "Solo Tour in Nepal",
    destination: "Kathmandu & Pokhara",
    startDate: "2025-04-10T00:00:00.000Z",
    endDate: "2025-04-17T00:00:00.000Z",
    budgetRange: "30,000 - 45,000 BDT",
    status: "rejected",
    createdAt: "2025-02-28T18:10:00.000Z",
    user: { name: "Ariful Islam", email: "arif@example.com" },
  },
];

export default function ManageTravelPlansPage() {
  const [plans, setPlans] = useState<TravelPlanType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = async () => {
    setLoading(true);

    setTimeout(() => {
      setPlans(MOCK_PLANS);
      setLoading(false);
    }, 800);
  };

  // ⭐ FIXED: Strong typing for status
  const updateStatus = (id: string, status: StatusType) => {
    const updated = plans.map((plan) =>
      plan._id === id ? { ...plan, status } : plan
    );
    setPlans(updated);
    toast.success(`Plan marked as ${status}`);
  };

  const deletePlan = (id: string) => {
    const filtered = plans.filter((plan) => plan._id !== id);
    setPlans(filtered);
    toast.success("Travel plan deleted");
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Travel Plans</h1>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : plans.length === 0 ? (
        <p className="text-center text-muted-foreground pt-10">
          No travel plans available
        </p>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <Card key={plan._id}>
              <CardContent className="flex justify-between flex-col md:flex-row gap-4 p-4">
                {/* LEFT SIDE */}
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-semibold">{plan.title}</h2>

                  <p>
                    <span className="font-medium">Destination:</span>{" "}
                    {plan.destination}
                  </p>

                  <p>
                    <span className="font-medium">Dates:</span>{" "}
                    {new Date(plan.startDate).toLocaleDateString()} -{" "}
                    {new Date(plan.endDate).toLocaleDateString()}
                  </p>

                  <p>
                    <span className="font-medium">Budget:</span>{" "}
                    {plan.budgetRange}
                  </p>

                  <p>
                    <span className="font-medium">Traveler:</span>{" "}
                    {plan.user.name} ({plan.user.email})
                  </p>

                  <p className="text-xs mt-1">
                    Posted on {new Date(plan.createdAt).toLocaleDateString()}
                  </p>

                  <p className="text-xs font-semibold">
                    Status:
                    <span
                      className={`ml-1 ${
                        plan.status === "approved"
                          ? "text-green-600"
                          : plan.status === "rejected"
                          ? "text-red-600"
                          : "text-orange-600"
                      }`}
                    >
                      {plan.status.toUpperCase()}
                    </span>
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-2 flex-wrap items-start">
                  <Button
                    variant="outline"
                    disabled={plan.status === "approved"}
                    onClick={() => updateStatus(plan._id, "approved")}
                    className="flex items-center gap-1"
                  >
                    <Check size={16} /> Approve
                  </Button>

                  <Button
                    variant="outline"
                    disabled={plan.status === "rejected"}
                    onClick={() => updateStatus(plan._id, "rejected")}
                    className="flex items-center gap-1 text-red-500"
                  >
                    <X size={16} /> Reject
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => deletePlan(plan._id)}
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
