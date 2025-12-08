/* eslint-disable @typescript-eslint/no-explicit-any */

import TravallerDetailsCard from "@/components/modules/modal/TravallerDetailsCard"
import { getCookie } from "@/services/auth/tokenHandlers";
import { redirect } from "next/navigation";

// export const generateStaticParams = async () => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`)
//     const { data: blogs } = await res.json()
//     return blogs?.data?.slice(0, 2).map((blog: any) => ({
//         blogid: String(blog.id)
//     }))
// }

// export const generateMetadata = async ({ params }: { params: Promise<{ blogid: string }> }) => {
//     const { id } = await params
//     const data = await getBlogById(blogid)
//     const blog= data.data

//     return {
//         title: blog?.title,
//         description: blog?.content
//     }
// }

export default async function BlogDetailsPage({ params }: { params: Promise<{ blogid: string }> }) {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
        redirect("/login");
    }
    const { id } = await params
    const res = await fetch(`http://localhost:5000/api/users/travaller/${id}`);
    const responseData = await res.json();
    const results = responseData?.data;
    console.log(results);

    return (
        <div className="py-30 px-4 max-w-7xl mx-auto">
            <TravallerDetailsCard results={results} />
        </div>
    );
};

