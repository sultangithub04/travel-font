/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


export default function AdminChangePassword() {
  const router = useRouter();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const toggleShow = (field: "old" | "new" | "confirm") => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // Example API call:
      const res = await fetch("/api/admin/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Password changed successfully!");
      router.push("/admin/profile");

    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="bg-white dark:bg-neutral-900 border shadow-lg p-8 rounded-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 flex justify-center items-center gap-2">
          <Lock size={26} /> Change Admin Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Old Password */}
          <div>
            <label className="font-medium">Old Password</label>
            <div className="relative">
              <input
                type={showPassword.old ? "text" : "password"}
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded mt-1 bg-transparent"
              />
              <span
                onClick={() => toggleShow("old")}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword.old ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="font-medium">New Password</label>
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded mt-1 bg-transparent"
              />
              <span
                onClick={() => toggleShow("new")}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword.new ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded mt-1 bg-transparent"
              />
              <span
                onClick={() => toggleShow("confirm")}
                className="absolute right-3 top-3 cursor-pointer text-gray-500"
              >
                {showPassword.confirm ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>

          <button
            disabled={loading}
            className="bg-teal-600 w-full py-2 rounded text-white font-semibold hover:bg-teal-700 transition"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>

        </form>

        <button
          onClick={() => router.back()}
          className="mt-4 w-full text-center underline text-sm text-gray-600 hover:text-teal-600"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
