import { Link } from "react-router-dom";
import NotificationBell from "./NotificationBell";

function NavbarActions({ isLoggedIn, onLogout }) {
    return (
        <div className="hidden items-center gap-3 md:flex">

            {isLoggedIn && (
                <NotificationBell />
            )}

            {isLoggedIn ? (
                <button
                    onClick={onLogout}
                    className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Logout
                </button>
            ) : (
                <Link
                    to="/login"
                    className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    Login →
                </Link>
            )}

        </div>
    );
}

export default NavbarActions;