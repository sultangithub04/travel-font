/* eslint-disable @typescript-eslint/no-explicit-any */

import TravallerDetailsCard from "@/components/modules/modal/TravallerDetailsCard"

export const generateStaticParams = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`)
    const { data: travaller } = await res.json()
    return travaller?.slice(0, 5).map((trav: any) => ({
        id: String(trav.id)
    }))
}

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/travaller/${id}`);
    const result = await res.json();
    return {
        title: result?.data.name,
        description: result?.data.address,
    }
}

export default async function TravallerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/travaller/${id}`);
    const responseData = await res.json();
    const results = responseData?.data;
    return (
        <div className="py-30 px-4 max-w-7xl mx-auto">
            <TravallerDetailsCard results={results} />
        </div>
    );
};

