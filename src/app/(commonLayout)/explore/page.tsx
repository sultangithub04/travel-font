/* eslint-disable @typescript-eslint/no-explicit-any */
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";


const Explore = async () => {

  const res = await fetch("http://localhost:5000/api/users");

  const responseData = await res.json();
  const results = responseData?.data;
  

  return (
    <div className="container mx-auto px-4 py-12">


      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((traveler: { id: Key | null | undefined; profilePhoto: string | StaticImport; name: string; email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; address: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; travelPlans: any[]; }) => (
            <div
              key={traveler.id}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-neutral-700"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-teal-500">
                  <Image
                    src={traveler?.profilePhoto}
                    alt={traveler?.name}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{traveler.email}</h3>
                  <p className="text-sm text-gray-500">{traveler?.address}</p>
                  <p className="text-sm text-teal-600 font-medium mt-1">
                    {traveler?.travelPlans.map((plan) => (
                      <span key={plan._id} className="px-2 py-1 bg-teal-100 text-teal-700 rounded-md mr-2">
                        {plan.travelType}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <Link
                href={`/explore/${traveler.id}`}
                className="inline-block mt-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all text-sm"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">
          No travelers found for this criteria.
        </p>
      )}
    </div>
  );
};

export default Explore;
