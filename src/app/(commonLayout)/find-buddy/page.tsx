/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import {  Calendar } from "lucide-react";
import SubscribeModal from "@/components/modules/Home/SubscribeModal";



const FindBuddy = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`, { cache: "no-store" });

  const responseData = await res.json();
  const travelPlans = responseData?.data;



  // Here you can fetch real data from API
  // useEffect(() => { fetch("/api/travel-plans")... }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-teal-600 mb-8 text-center">
        Find Travel Buddy
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {travelPlans.map((plan:any) => (
          <div
            key={plan.id}

            className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-teal-500">
                <Image
                  src={plan?.profilePhoto}
                  alt={plan?.name}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{plan?.name}</h3>
                <p className="text-sm text-gray-500">{plan.address}</p>
                <p className="text-sm text-teal-600 font-medium mt-1">
                      {plan?.travelPlans?.length > 0 && (
                  <div className="space-y-2">
                    <p>{plan.travelPlans[0].travelType}</p>
                  </div>
                )}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              <p>
                
                {plan?.travelPlans?.length > 0 && (
                  <div className="space-y-2">
                    <p>
                      <Calendar size={16} className="inline mr-1" />
                      {new Date(plan.travelPlans[0].startDate).toLocaleDateString()} →
                      {new Date(plan.travelPlans[0].endDate).toLocaleDateString()}
                    </p>

                    <p>Budget: {plan.travelPlans[0].budgetRange}</p>
                  </div>
                )}

              </p>

            </div>

            {/* <Link
              href={`/travel-plans/${plan.id}`}
              className="inline-block mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all text-sm w-full text-center"
            >
              Request to Join
            </Link> */}
            <SubscribeModal id={plan.id}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindBuddy;
