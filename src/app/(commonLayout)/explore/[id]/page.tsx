/* eslint-disable @typescript-eslint/no-explicit-any */

import TravallerDetailsCard from "@/components/modules/modal/TravallerDetailsCard"
import { getCookie } from "@/services/auth/tokenHandlers";
import { redirect } from "next/navigation";



export default async function BlogDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
        redirect("/login");
    }
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/travaller/${id}`);
    const responseData = await res.json();
    const results = responseData?.data;
    console.log(results);

    return (
        <div className="py-30 px-4 max-w-7xl mx-auto">
            <TravallerDetailsCard results={results} />
        </div>
    );
};

