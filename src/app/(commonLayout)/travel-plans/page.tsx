/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserInfo } from "@/services/auth/getUserInfo";
import CreateTravelPlanModal from "@/components/modules/modal/CreateTravelPlanModal";
import EditTravelPlanModal from "@/components/modules/modal/EditTravelPlanModal";
import DeleteModal from "@/components/modules/modal/DeleteModal";
export const dynamic = "force-dynamic";

const TravelPlans = async () => {
  const userInfo = await getUserInfo();
  const emailFromsession = userInfo?.email;

  const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromsession}`, {
    cache: "no-store",
  });

  const { data } = await resultData.json();
  const userTravelPlans = data.travelPlans || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-600">My Travel Plans</h1>
        <CreateTravelPlanModal />
      </div>

      {userTravelPlans.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userTravelPlans.map((plan:any) => (
            <div key={plan.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 border">
              <h2 className="text-xl font-semibold">{plan.destination}</h2>
              <p className="text-gray-500 text-sm mt-1">{plan.description}</p>

              <div className="text-sm mt-3">
                <p>
                  {new Date(plan.startDate).toLocaleDateString()} → 
                  {new Date(plan.endDate).toLocaleDateString()}
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
        <p className="text-center text-gray-500 mt-8">
          You have no travel plans. Create one!
        </p>
      )}
    </div>
  );
};

export default TravelPlans;
