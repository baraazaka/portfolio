import { useEffect, useState } from "react";

import api, {
    getDashboardStats,
    publishPortfolio,
    unpublishPortfolio,
} from "../services/api";

import DashboardStats from "../components/dashboard/DashboardStats";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);

    const [publishing, setPublishing] = useState(false);
    const [publishMessage, setPublishMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadDashboard() {
            try {
                setLoading(true);
                setStatsLoading(true);
                setError("");

                const [userResponse, statsResponse] =
                    await Promise.all([
                        api.get("/users/me"),
                        getDashboardStats(),
                    ]);

                console.log(
                    "CURRENT USER:",
                    userResponse.data
                );

                console.log(
                    "DASHBOARD STATS:",
                    statsResponse
                );

                setUser(userResponse.data);
                setStats(statsResponse);

            } catch (error) {
                console.error(
                    "Dashboard error:",
                    error
                );

                setError(
                    error.response?.data?.error ||
                    "Failed to load dashboard."
                );
            } finally {
                setLoading(false);
                setStatsLoading(false);
            }
        }

        loadDashboard();
    }, []);


    // =========================
    // Publish / Unpublish
    // =========================

    async function handleTogglePortfolio() {
        if (!user?.id) {
            return;
        }

        try {
            setPublishing(true);
            setPublishMessage("");
            setError("");

            let response;

            if (user.portfolio_published) {

                // Unpublish
                response = await unpublishPortfolio(user.id);

                console.log(
                    "UNPUBLISH PORTFOLIO:",
                    response
                );

                setPublishMessage(
                    "Your portfolio has been unpublished successfully."
                );

            } else {

                // Publish
                response = await publishPortfolio(user.id);

                console.log(
                    "PUBLISH PORTFOLIO:",
                    response
                );

                setPublishMessage(
                    "Your portfolio has been published successfully."
                );
            }


            // Update user immediately
            if (response?.user) {

                setUser(response.user);

            } else {

                setUser((currentUser) => ({
                    ...currentUser,
                    portfolio_published:
                        !currentUser.portfolio_published,
                }));

            }

        } catch (error) {

            console.error(
                "Toggle portfolio error:",
                error
            );

            setError(
                error.response?.data?.error ||
                "Failed to update portfolio visibility."
            );

        } finally {

            setPublishing(false);

        }
    }


    // =========================
    // Loading
    // =========================

    if (loading) {
        return (
            <div className="mx-auto max-w-5xl">

                <div className="rounded-2xl border border-gray-200 bg-white p-6">

                    <p className="text-sm text-gray-500">
                        Loading dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // =========================
    // User Error
    // =========================

    if (!user) {
        return (
            <div className="mx-auto max-w-5xl">

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

                    <p className="text-sm text-red-600">
                        {error || "Failed to load user."}
                    </p>

                </div>

            </div>
        );
    }


    const portfolioUrl = user.username
        ? `/portfolio/${user.username}`
        : null;


    return (
        <div className="mx-auto max-w-5xl">

            {/* =========================
                Overview Header
            ========================= */}

            <div className="mb-8">

                <p className="text-sm text-gray-400">
                    Overview
                </p>

                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-950">
                    Welcome back, {user.name}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Here is an overview of your portfolio.
                </p>

            </div>


            {/* =========================
                Portfolio Visibility Card
            ========================= */}

            <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">

                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">

                    {/* Information */}

                    <div>

                        <div className="flex flex-wrap items-center gap-3">

                            <h2 className="text-lg font-semibold text-gray-950">
                                Your Portfolio
                            </h2>


                            {user.portfolio_published ? (

                                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                                    Published
                                </span>

                            ) : (

                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                                    Not Published
                                </span>

                            )}

                        </div>


                        <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">

                            {user.portfolio_published
                                ? "Your portfolio is currently visible publicly."
                                : "Your portfolio is currently private. Publish it to make it visible to others."
                            }

                        </p>

                    </div>


                    {/* Actions */}

                    <div className="flex flex-wrap gap-2">

                        {/* Toggle Publish */}

                        <button
                            type="button"
                            onClick={handleTogglePortfolio}
                            disabled={publishing}
                            className={`rounded-xl px-5 py-3 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                user.portfolio_published
                                    ? "bg-red-600 hover:bg-red-700"
                                    : "bg-black hover:bg-gray-800"
                            }`}
                        >

                            {publishing
                                ? "Updating..."
                                : user.portfolio_published
                                    ? "Unpublish Portfolio"
                                    : "Publish Portfolio"
                            }

                        </button>


                        {/* View Portfolio */}

                        {user.portfolio_published &&
                            portfolioUrl && (

                            <a
                                href={portfolioUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                View Portfolio
                            </a>

                        )}

                    </div>

                </div>


                {/* =========================
                    Success Message
                ========================= */}

                {publishMessage && (

                    <div className="border-t border-green-100 bg-green-50 px-6 py-3">

                        <p className="text-sm font-medium text-green-700">
                            ✓ {publishMessage}
                        </p>

                    </div>

                )}


                {/* =========================
                    Error Message
                ========================= */}

                {error && (

                    <div className="border-t border-red-100 bg-red-50 px-6 py-3">

                        <p className="text-sm text-red-600">
                            {error}
                        </p>

                    </div>

                )}

            </div>


            {/* =========================
                Dashboard Stats
            ========================= */}

            <DashboardStats
                stats={stats}
                loading={statsLoading}
            />

        </div>
    );
}

export default Dashboard;