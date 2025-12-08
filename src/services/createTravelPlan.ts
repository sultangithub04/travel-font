"use server";
import { auth } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUserInfo } from "./auth/getUserInfo";


export const createTravelPlan = async (data: FormData) => {
  const userInfo = await getUserInfo();
  const emailFromsession= userInfo?.email
 
  const resultData = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${emailFromsession}`)
  const { data:user } = await resultData.json()
  const userId= user.id
  console.log(userId);

  const projectInfo = Object.fromEntries(data.entries());
  const modifiedData = {
    ...projectInfo,
    userId: user?.id,

  };
console.log(modifiedData);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/travel-plans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modifiedData),
  });

  const result = await res.json();

  if (result?.data?.id) {
    // revalidateTag("travel-plans");
    revalidatePath("/travel-plans");
    redirect("/travel-plans");
  }
  return result;
};