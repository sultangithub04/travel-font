import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <>  
            <PublicNavbar/>
            {children}
            <PublicFooter/>
        </>
    );
};

export default CommonLayout;