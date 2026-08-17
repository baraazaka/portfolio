import { Link } from "react-router-dom";

function DashboardHeader({ setIsOpen }) {
    return (
        <>
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

            <header className="hidden border-b border-gray-200 bg-white px-6 py-5 md:block md:px-10">
                <h1 className="text-2xl font-bold text-gray-900">
                    Overview
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage your portfolio from one place.
                </p>
            </header>
        </>
    );
}

export default DashboardHeader;