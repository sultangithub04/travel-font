"use client";

import Link from "next/link";


const CTAButton = () => {
    return (
        <div        
            className="w-full flex justify-center"
        >
            <Link
                href="/find-buddy"
                className="relative inline-flex items-center justify-center overflow-hidden text-white text-lg font-medium px-8 py-3 rounded-lg"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-700 blur-lg opacity-30"></span>
                <span className="relative z-10">Find Buddy</span>
            </Link>
        </div>
    );
};

export default CTAButton;
