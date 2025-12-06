// import { getCookie } from "@/services/auth/tokenHandlers";
// import { Menu } from "lucide-react";
// import Link from "next/link";
// import { Button } from "../ui/button";
// import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
// import LogoutButton from "./LogoutButton";

// const PublicNavbar = async () => {
//   const navItems = [
//     { href: "#", label: "Consultation1" },
//     { href: "#", label: "Health Plans" },
//     { href: "#", label: "Medicine" },
//     { href: "#", label: "Diagnostics" },
//     { href: "#", label: "NGOs" },
//   ];

//   const accessToken = await getCookie("accessToken");

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur  dark:bg-background/95">
//       <div className="container mx-auto flex h-16 items-center justify-between px-4">
//         <Link href="/" className="flex items-center space-x-2">
//           <span className="text-xl font-bold text-primary">PH Doc</span>
//         </Link>

//         <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
//           {navItems.map((link) => (
//             <Link
//               key={link.label}
//               href={link.href}
//               className="text-foreground hover:text-primary transition-colors"
//             >
//               {link.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="hidden md:flex items-center space-x-2">
//           {accessToken ? (
//             <LogoutButton />
//           ) : (
//             <Link href="/login">
//               <Button>Login</Button>
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu */}

//         <div className="md:hidden">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="outline">
//                 {" "}
//                 <Menu />{" "}
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
//               <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
//               <nav className="flex flex-col space-y-4 mt-8">
//                 {navItems.map((link) => (
//                   <Link
//                     key={link.label}
//                     href={link.href}
//                     className="text-lg font-medium"
//                   >
//                     {link.label}
//                   </Link>
//                 ))}
//                 <div className="border-t pt-4 flex flex-col space-y-4">
//                   <div className="flex justify-center"></div>
//                   <Link href="/login" className="text-lg font-medium">
//                     <Button>Login</Button>
//                   </Link>
//                 </div>
//               </nav>
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default PublicNavbar;

import { getCookie } from "@/services/auth/tokenHandlers";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./LogoutButton";
import { getUserInfo } from "@/services/auth/getUserInfo";
import jwt, { JwtPayload } from "jsonwebtoken";

const PublicNavbar = async () => {
  const accessToken = await getCookie("accessToken");
  const role = await getUserInfo()

  const userRole = role?.role; // USER | ADMIN | undefined

  

  const commonNav = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Travelers" },
  ];

  const guestNav = [
    { href: "/find-buddy", label: "Find Travel Buddy" },
    { href: "/login", label: " " },
    { href: "/register", label: "Register" },
  ];

  const userNav = [
    { href: "/travel-plans", label: "My Travel Plans" },
    { href: "/profile", label: "Profile" },
  ];

  const adminNav = [
    { href: "/admin/profile", label: "Admin Dashboard" },
    { href: "/admin/manageuser", label: "Manage Users" },
    { href: "/admin/manage-travelplan", label: "Manage Travel Plans" },
    { href: "/admin/profile", label: "Profile" },
  ];

  const getNavBasedOnRole = () => {
    if (!accessToken) return guestNav;
    if (userRole === "ADMIN") return adminNav;
    return userNav;
  };

  const finalNavItems = [...commonNav, ...getNavBasedOnRole()];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur dark:bg-background/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">TraValler</span>
        </Link>

        {/* ====== Desktop Menu ====== */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {finalNavItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Login / Logout Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* ===== Mobile Menu ===== */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <nav className="flex flex-col space-y-4 mt-8">
                {finalNavItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t pt-4 flex flex-col space-y-4">
                  {accessToken ? (
                    <LogoutButton />
                  ) : (
                    <Link href="/login" className="text-lg font-medium">
                      <Button className="w-full">Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
