import { Link } from "react-router-dom";

function DashboardSidebar({ isOpen, setIsOpen }) {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:static md:z-auto md:translate-x-0`}
            >
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-6">
                    <Link
                        to="/"
                        className="text-xl font-bold tracking-tight text-gray-900"
                    >
                        Portfolio
                    </Link>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-xl text-gray-500 transition hover:text-gray-900 md:hidden"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

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
        </>
    );
}

export default DashboardSidebar;