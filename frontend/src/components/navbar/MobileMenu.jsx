import { Link } from "react-router-dom";

function MobileMenu({
    isOpen,
    isLoggedIn,
    onClose,
    onLogout
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">

            <div className="flex flex-col gap-2">

                <Link
                    to="/"
                    onClick={onClose}
                    className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                    Home
                </Link>

                <Link
                    to="/projects"
                    onClick={onClose}
                    className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                    Projects
                </Link>

                <Link
                    to="/portfolios"
                    onClick={onClose}
                    className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                    Portfolios
                </Link>

                <Link
                    to="/contact"
                    onClick={onClose}
                    className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                    Contact
                </Link>

                {isLoggedIn && (
                    <>
                        <Link
                            to="/dashboard"
                            onClick={onClose}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/dashboard/messages"
                            onClick={onClose}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                            🔔 Notifications
                        </Link>
                    </>
                )}

                {isLoggedIn ? (
                    <button
                        onClick={onLogout}
                        className="mt-2 rounded-lg bg-black px-4 py-3 text-center font-medium text-white"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        onClick={onClose}
                        className="mt-2 rounded-lg bg-black px-4 py-3 text-center font-medium text-white"
                    >
                        Login →
                    </Link>
                )}

            </div>

        </div>
    );
}

export default MobileMenu;