""
import { NavSection } from "@/types/dashboard.interface";
import { UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {


    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: `/admin/profile`,
                    icon: "LayoutDashboard",
                    roles: ["TRAVELLER", "ADMIN"],
                },
        
                  {
                    title: "Change Password",
                    href: "/admin/change-password",
                    icon: "Settings", // ✅ String
                    roles: ["TRAVELLER"],
                },

            ]
        },
        {
            title: "Admin Management",
            items: [
                {
                title: "Manage Users",
                href: "/admin/manage-users",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
                {
                title: "Manage Travel Plans",
                href: "/admin/manage-plans",
                icon: "Calendar", // ✅ String
                roles: ["ADMIN"],
            },
                {
                title: "Manage Reviews",
                href: "/admin/manage-review",
                icon: "ClipboardList", // ✅ String
                roles: ["ADMIN"],
            },
            ],
        },
    ]
}



export const travallerNavItems: NavSection[] = [
    {
        title: "Appointments",
        items: [
            {
                title: "My Appointments",
                href: "/dashboard/my-appointments",
                icon: "Calendar", // ✅ String
                roles: ["TRAVELLER"],
            },
            {
                title: "Book Appointment",
                href: "/consultation",
                icon: "ClipboardList", // ✅ String
                roles: ["TRAVELLER"],
            },
        ],
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "My Prescriptions",
                href: "/dashboard/my-prescriptions",
                icon: "FileText", // ✅ String
                roles: ["TRAVELLER"],
            },
            {
                title: "Health Records",
                href: "/dashboard/health-records",
                icon: "Activity", // ✅ String
                roles: ["TRAVELLER"],
            },
        ],
    },

]

export const adminNavItems: NavSection[] = []

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
  
        case "TRAVELLER":
            return [...commonNavItems, ...travallerNavItems];
        default:
            return [];
    }
}