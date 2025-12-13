"use client";

import { FormEvent, useState } from "react";



export default function CheckoutForm() {
  const [loading, setLoading] = useState(false);

  const subscriptionType = "MONTHLY"
  const amount = 100
  const id = "5c996660-a3f6-4780-89e6-32a0533052ce"

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/payments/create-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id,
        subscriptionType,
        amount,

      })
    });

    const data = await res.json();


    // const initiatePayment = async () => {
    //   try {
    //     setProcessing(true);

    //     const res = await fetch("http://localhost:5000/api/payments/create-intent", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json"
    //       },
    //       body: JSON.stringify({
    //         userId: id,
    //         subscriptionType,
    //         amount,

    //       })
    //     });

    //     const result = await res.json();
    //     console.log("Payment intent result →", result);

    //     if (!result.success) throw new Error(result?.message || "Payment failed");

    //     toast.success("Redirecting to Stripe payment getway...");

    //     if (result?.data) {
    //       window.location.href = result.data;
    //     }

    //   } catch (error) {
    //     console.log(error);
    //     toast.error("Payment failed! Try again later.");
    //   } finally {
    //     setProcessing(false);
    //   }
    // };

console.log(data);

    // const stripe = await getStripe();
    // await stripe?.redirectToCheckout({ sessionId: data.id});
window.location.href = data.data
    setLoading(false);
  };

  return (
    <form onSubmit={handleCheckout}>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
      >
        {loading ? "Redirecting..." : "Pay Now"}
      </button>
    </form>
  );
}
