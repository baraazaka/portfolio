function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">

            <div className="flex min-h-screen">

                <aside className="hidden w-64 border-r border-gray-200 bg-white md:block">
                    <div className="p-6">

                        <h1 className="text-xl font-bold">
                            Dashboard
                        </h1>

                        <nav className="mt-8 space-y-2">

                            <a
                                href="#"
                                className="block rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900"
                            >
                                Overview
                            </a>

                            <a
                                href="#"
                                className="block rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-100"
                            >
                                Projects
                            </a>

                            <a
                                href="#"
                                className="block rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-100"
                            >
                                Profile
                            </a>

                        </nav>

                    </div>
                </aside>

                <main className="flex-1 p-6 md:p-10">

                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome back 👋
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Manage your portfolio from here.
                    </p>

                </main>

            </div>

        </div>
    );
}

export default Dashboard;