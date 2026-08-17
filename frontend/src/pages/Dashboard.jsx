import { useEffect, useState } from "react";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import RecentProjects from "../components/dashboard/RecentProjects";
import RecentExperience from "../components/dashboard/RecentExperience";

import { getDashboardStats } from "../services/api";

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                const data = await getDashboardStats();

                setStats(data);
            } catch (error) {
                console.error("Dashboard error:", error);

                setError("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen">

                <DashboardSidebar
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />

                <main className="flex-1">

                    <DashboardHeader
                        setIsOpen={setIsOpen}
                    />

                    <section className="p-6 md:p-10">

                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                Welcome back 👋
                            </h2>

                            <p className="mt-2 text-gray-600">
                                Here’s an overview of your portfolio.
                            </p>
                        </div>

                        {error && (
                            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <DashboardStats
                            stats={stats}
                            loading={loading}
                        />

                        <RecentProjects
                            projects={stats?.recentProjects}
                            loading={loading}
                        />

                        <RecentExperience
                            experiences={stats?.recentExperiences}
                            loading={loading}
                        />

                    </section>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;