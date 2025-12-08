

import Image from "next/image";

import { Users, Plane, Star, Settings, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { getUserInfo } from "@/services/auth/getUserInfo";

const admin = {
  id: "admin-01",
  name: "Admin User",
  email: "admin@example.com",
  profileImage: "/admin.jpg",
  role: "admin",
  createdUsers: 120,
  approvedPlans: 56,
  verifiedUsers: 19,
  recentActions: [
    "Approved travel plan: Japan Trip",
    "Verified user: Emily Carter",
    "Deleted review marked as spam",
  ],
};

const AdminProfile = async() => {

  const userInfo = await getUserInfo();
  const emailFromsession= userInfo?.email
 
  const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromsession}`)
  const { data } = await resultData.json()
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`);

  const responseData = await res.json();

  console.log(responseData);

console.log(data);
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <div className="w-36 h-36 relative rounded-full overflow-hidden border-4 border-teal-600 shadow-md">
          <Image src={admin.profileImage} alt={admin.name} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-bold">{admin.name}</h1>
          <p className="text-gray-500">{admin.email}</p>

          <div className="mt-3 flex items-center bg-teal-600 text-white px-3 py-1 rounded-full w-fit">
            <ShieldCheck size={18} className="mr-2" />
            Admin Access
          </div>

          <p className="mt-2 text-gray-700 max-w-md">
            You have access to manage users, travel plans, reviews and payments.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
         
          className="bg-white dark:bg-neutral-800 border p-6 rounded-xl shadow-md"
        >
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Users Managed</p>
            <Users className="text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold mt-3">{admin.createdUsers}</h2>
        </div>

        <div
         
          className="bg-white dark:bg-neutral-800 border p-6 rounded-xl shadow-md"
        >
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Approved Plans</p>
            <Plane className="text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold mt-3">{admin.approvedPlans}</h2>
        </div>

        <div
 
          className="bg-white dark:bg-neutral-800 border p-6 rounded-xl shadow-md"
        >
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Verified Users</p>
            <Star className="text-teal-600" />
          </div>
          <h2 className="text-3xl font-bold mt-3">{admin.verifiedUsers}</h2>
        </div>
      </div>

      {/* Quick Admin Links */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-teal-600">Quick Access</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link href="/admin/manage-users">
            <div
          
              className="p-4 border rounded-xl bg-gray-50 dark:bg-neutral-900 hover:border-teal-500 shadow cursor-pointer"
            >
              <p className="font-semibold text-lg">Manage Users</p>
              <span className="text-sm text-gray-500">View, approve, verify</span>
            </div>
          </Link>

          <Link href="/admin/manage-plans">
            <div
         
              className="p-4 border rounded-xl bg-gray-50 dark:bg-neutral-900 hover:border-teal-500 shadow cursor-pointer"
            >
              <p className="font-semibold text-lg">Manage Travel Plans</p>
              <span className="text-sm text-gray-500">Approve, delete</span>
            </div>
          </Link>

          <Link href="/admin/reviews">
            <div
          
              className="p-4 border rounded-xl bg-gray-50 dark:bg-neutral-900 hover:border-teal-500 shadow cursor-pointer"
            >
              <p className="font-semibold text-lg">Manage Reviews</p>
              <span className="text-sm text-gray-500">Remove spam/fraud</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-teal-600">Recent Activities</h2>

        <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border shadow space-y-3">
          {admin.recentActions.map((log, index) => (
            <p key={index} className="text-gray-700 dark:text-gray-300 text-sm">
              • {log}
            </p>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-gray-600 flex items-center">
          <Settings size={16} className="mr-2" /> Admin Settings
        </h2>
        <Link
          href="/admin/settings"
          className="text-teal-600 underline hover:text-teal-800 text-sm"
        >
          Configure platform privileges
        </Link>
      </div>
    </div>
  );
};

export default AdminProfile;
