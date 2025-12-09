/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo } from "@/services/auth/getUserInfo";
import CreateTravelPlanModal from "@/components/modules/modal/CreateTravelPlanModal";
import EditTravelPlanModal from "@/components/modules/modal/EditTravelPlanModal";
import DeleteModal from "@/components/modules/modal/DeleteModal";
import { formatDate } from "@/components/shared/formatedDate";
import PaymentModal from "@/components/modules/modal/PaymentModal";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const TravelPlans = async () => {
  const userInfo = await getUserInfo();
  const emailFromsession = userInfo?.email;

  // 1️⃣ My Travel Plans
  const resultData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromsession}`,
    { cache: "no-store" }
  );
  const { data } = await resultData.json();
  const userTravelPlans = data.travelPlans || [];


  // 2️⃣ All Other Travel Plans
  const allTravelRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/travel-plans`,
    { cache: "no-store" }
  );

  const allTravelData = await allTravelRes.json();
  const allTravelPlans = allTravelData?.data || [];
  console.log(allTravelPlans);


  return (
    <div className="container mx-auto px-4 py-12">

      {/* ------------------ My Travel Plans ------------------ */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-600">My Travel Plans</h1>
        <CreateTravelPlanModal />
      </div>

      {userTravelPlans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {userTravelPlans.map((plan: any) => (
            <div
              key={plan.id}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border"
            >
              <h2 className="text-xl font-semibold">{plan.destination}</h2>
              <p className="text-gray-500 text-sm mt-1">{plan.description}</p>

              <div className="text-sm mt-3">
                <p>
                  {formatDate(plan.startDate)} →
                  {formatDate(plan.endDate)}
                </p>
                <p>Budget: {plan.budgetRange}</p>
                <p>Travel Type: {plan.travelType}</p>
              </div>

              <div className="flex justify-between mt-5">
                <EditTravelPlanModal plan={plan} />
                <DeleteModal id={plan.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8 mb-16">
          You have no travel plans. Create one!
        </p>
      )}

      {/* ------------------ All Travel Plans List ------------------ */}
      <h2 className="text-2xl font-bold text-teal-600 mb-6">
        All Travelers Plans
      </h2>

      {allTravelPlans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {allTravelPlans.map((plan: any) => (
            <div
              key={plan.id}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 border"
            >
              <h2 className="text-lg font-semibold">{plan.title}</h2>

              <p className="text-sm mt-2">
                <strong>Destination:</strong> {plan.destination}
              </p>

              <div className="text-sm mt-3">

                <p>
                  {formatDate(plan.startDate)} →
                  {formatDate(plan.endDate)}
                </p>
                <p>Budget: {plan.budgetRange}</p>
              </div>

              <p className="text-sm mt-2">
                <strong>Travel Type:</strong> {plan.travelType}
              </p>


              <PaymentModal id={plan.userId} />

              {/* {plan?.status === "UNPAID" ? (


              ): (
                  <Button className = "px-4 py-2 disabled bg-teal-600 hover:bg-teal-700 text-white rounded-lg mt-4 w-full">
                  Subscribed
                </Button>

          )} */}







        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 text-center">No travel plans found.</p>
  )
}
    </div >
  );
};

export default TravelPlans;


