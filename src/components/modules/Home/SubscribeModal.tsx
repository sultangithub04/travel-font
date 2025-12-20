"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface PaymentModalProps {
  id: string;
  user?: { id: string; email: string }; // pass current user from context or props
}

export default function PaymentModal({ id, user }: PaymentModalProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("MONTHLY");

  const amount = subscriptionType === "MONTHLY" ? 100 : 500;

  const initiatePayment = async () => {
    // ✅ Check login first
    if (!user) {
      toast.error("You must login before subscribing!");
      router.push("/login"); // redirect to login page
      return;
    }

    try {
      setProcessing(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payments/create-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          travelPlanId: id,
          subscriptionType,
          amount,
        }),
      });

      const result = await res.json();
      console.log("Payment intent result →", result);

      if (!result.success) throw new Error(result?.message || "Payment failed");

      toast.success("Redirecting to Stripe payment gateway...");

      if (result?.data) {
        window.location.href = result.data;
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed! Try again later.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg mt-4 w-full">
          Subscribe Now
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-sm mx-auto text-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-gray-800">
            {user ? "Choose Subscription" : "Before Subscription Please Login"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-2 leading-relaxed">
            {user
              ? "Select your subscription type. Amount updates automatically."
              : "You must be logged in to subscribe."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {user && (
          <div className="flex items-center justify-between gap-4 mt-4">
            <div className="w-1/2">
              <label className="text-sm font-semibold">Subscription Type</label>
              <Select value={subscriptionType} onValueChange={setSubscriptionType}>
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MONTHLY">Monthly Package</SelectItem>
                  <SelectItem value="YEARLY">Yearly Package</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-1/2">
              <label className="text-sm font-semibold">Amount</label>
              <div className="bg-gray-100 mt-1 p-3 rounded-md text-sm font-bold text-center">
                BDT {amount}
              </div>
            </div>
          </div>
        )}

        <AlertDialogFooter className="flex justify-center gap-6 mt-6">
          <AlertDialogCancel
            disabled={processing}
            className="px-6 py-2 rounded-md border border-gray-400 text-gray-700"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={processing}
            className="px-6 py-2 rounded-md bg-teal-600 hover:bg-teal-700 text-white"
            onClick={initiatePayment}
          >
            {processing ? "Processing..." : user ? "Confirm Pay" : "Login First"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
