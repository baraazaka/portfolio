import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50">

            <DashboardSidebar />

            <main className="md:ml-64">
                <div className="px-6 py-8 lg:px-10">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}

export default DashboardLayout;