import Sidebar from "../components/dashboard/Sidebar";
import TopNavbar from "../components/dashboard/TopNavbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#060812] text-white flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main */}
            <div className="flex-1 min-w-0 flex flex-col">

                <TopNavbar />

                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-8">
                        {children}
                    </div>
                </main>

            </div>
        </div>
    );
}