// /* eslint-disable @typescript-eslint/no-explicit-any */

// import TravallerDetailsCard from "@/components/modules/modal/TravallerDetailsCard"

// export const generateStaticParams = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`)
//     const { data: travaller } = await res.json()
//     console.log(travaller);
//     return travaller?.slice(0, 5).map((trav: any) => ({
//         id: String(trav.id)
//     }))
// }

// export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
//     const { id } = await params
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/travaller/${id}`);
//     const result = await res.json();
//     return {
//         title: result?.data.name,
//         description: result?.data.address,
//     }
// }

// export default async function TravallerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
//     const { id } = await params
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/travaller/${id}`);
//     const responseData = await res.json();
//     const results = responseData?.data;
//     return (
//         <div className="py-30 px-4 max-w-7xl mx-auto">
//             <TravallerDetailsCard results={results} />
//         </div>
//     );
// };



/* eslint-disable @typescript-eslint/no-explicit-any */

import TravallerDetailsCard from "@/components/modules/modal/TravallerDetailsCard"

export const generateStaticParams = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users`);
        const json = await res.json();
        const travellers = json?.data ?? [];

        return travellers
            .slice(0, 5)
            .map((trav: any) => ({
                id: String(trav?.id ?? "")
            }))
            .filter((item: any) => item.id !== "");
    } catch {
        return [];
    }
};

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/travaller/${id}`);
        const result = await res.json();
        const user = result?.data ?? {};

        return {
            title: user?.name ?? "Traveller",
            description: user?.address ?? "Traveller profile page",
        };
    } catch {
        return {
            title: "Traveller",
            description: "Traveller profile page",
        };
    }
};

export default async function TravallerDetailsPage({ params }: { params: { id: string } }) {
    const { id } = params;

    let results = null;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/travaller/${id}`, {
            cache: "no-store",
        });

        const json = await res.json();
        results = json?.data ?? null;

    } catch (error) {
        console.error("Traveller fetch failed:", error);
    }

    if (!results) {
        return (
            <div className="text-center py-20 text-gray-500">
                Traveller not found.
            </div>
        );
    }

    return (
        <div className="py-30 px-4 max-w-7xl mx-auto">
            <TravallerDetailsCard results={results} />
        </div>
    );
}
