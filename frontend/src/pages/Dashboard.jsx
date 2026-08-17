import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/api";
import DashboardStats from "../components/dashboard/DashboardStats";
function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen">

                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside
                    className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:static md:z-auto md:translate-x-0`}
                >
                    {/* Logo */}
                    <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
                        <Link
                            to="/"
                            className="text-xl font-bold tracking-tight text-gray-900"
                        >
                            Portfolio
                        </Link>

                        {/* Mobile Close */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-xl text-gray-500 transition hover:text-gray-900 md:hidden"
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6">
                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Menu
                        </p>

                        <div className="space-y-1">
                            <Link
                                to="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="block rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-medium text-gray-900"
                            >
                                Overview
                            </Link>

                            <Link
                                to="/dashboard/projects"
                                onClick={() => setIsOpen(false)}
                                className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                Projects
                            </Link>

                            <Link
                                to="/dashboard/skills"
                                onClick={() => setIsOpen(false)}
                                className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                Skills
                            </Link>

                            <Link
                                to="/dashboard/experience"
                                onClick={() => setIsOpen(false)}
                                className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                Experience
                            </Link>

                            <Link
                                to="/dashboard/messages"
                                onClick={() => setIsOpen(false)}
                                className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                Messages
                            </Link>
                        </div>
                    </nav>

                    {/* Sidebar Bottom */}
                    <div className="border-t border-gray-100 p-4">
                        <Link
                            to="/"
                            onClick={() => setIsOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                            Back to website
                        </Link>
                    </div>
                </aside>

                {/* Main */}
                <main className="flex-1">

                    {/* Mobile Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4 md:hidden">
                        <Link
                            to="/"
                            className="font-bold text-gray-900"
                        >
                            Portfolio
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsOpen(true)}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700 transition hover:bg-gray-50"
                            aria-label="Open menu"
                        >
                            ☰
                        </button>
                    </div>

                    {/* Desktop Header */}
                    <header className="hidden border-b border-gray-200 bg-white px-6 py-5 md:block md:px-10">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Overview
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your portfolio from one place.
                        </p>
                    </header>

                <section className="p-6 md:p-10">
    {/* Welcome */}
    <div>
        <h2 className="text-xl font-semibold text-gray-900">
            Welcome back 👋
        </h2>

        <p className="mt-2 text-gray-600">
            Here’s an overview of your portfolio.
        </p>
    </div>

   <DashboardStats
    stats={stats}
    loading={loading}
/>

</section>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;