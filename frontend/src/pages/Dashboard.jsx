import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex min-h-screen">

                <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white md:flex md:flex-col">

                    <div className="border-b border-gray-100 px-6 py-6">
                        <Link
                            to="/"
                            className="text-xl font-bold tracking-tight text-gray-900"
                        >
                            Portfolio
                        </Link>
                    </div>

                    <nav className="flex-1 px-4 py-6">

                        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Menu
                        </p>

                        <div className="space-y-1">

                            <Link
                                to="/dashboard"
                                className="flex items-center rounded-lg bg-gray-100 px-3 py-2.5 text-sm font-medium text-gray-900"
                            >
                                Overview
                            </Link>

                            <Link
                                to="/dashboard/projects"
                                className="flex items-center rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                Projects
                            </Link>

                            <Link
                                to="/dashboard/skills"
                                className="flex items-center rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                Skills
                            </Link>

                            <Link
                                to="/dashboard/experience"
                                className="flex items-center rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                Experience
                            </Link>

                            <Link
                                to="/dashboard/messages"
                                className="flex items-center rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                            >
                                Messages
                            </Link>

                        </div>
                    </nav>

                    <div className="border-t border-gray-100 p-4">

                        <Link
                            to="/"
                            className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                        >
                            Back to website
                        </Link>

                    </div>
                </aside>

                <main className="flex-1">

                    <header className="border-b border-gray-200 bg-white px-6 py-5 md:px-10">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Overview
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your portfolio from one place.
                        </p>
                    </header>

                    <section className="p-6 md:p-10">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Welcome back 👋
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Here’s an overview of your portfolio.
                        </p>
                    </section>

                </main>

            </div>
        </div>
    );
}

export default Dashboard;