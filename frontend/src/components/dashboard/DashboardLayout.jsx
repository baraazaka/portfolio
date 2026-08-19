import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import api from "../../services/api";

import DashboardSidebar from "./DashboardSidebar";

function DashboardLayout() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function loadUser() {
            try {
                const response = await api.get("/users/me");

                console.log("CURRENT USER:", response.data);

                setUser(response.data);
            } catch (error) {
                console.error("Dashboard user error:", error);
            }
        }

        loadUser();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">

            <DashboardSidebar user={user} />

            <main className="md:ml-64">
                <div className="px-6 py-8 lg:px-10">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}

export default DashboardLayout;