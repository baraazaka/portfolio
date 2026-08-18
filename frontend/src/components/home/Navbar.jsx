import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const location = useLocation();

    function closeMenu() {
        setIsOpen(false);
    }

    useEffect(() => {
        function handleAuthChange() {
            setIsLoggedIn(!!localStorage.getItem("token"));
        }

        window.addEventListener("authChange", handleAuthChange);

        return () => {
            window.removeEventListener("authChange", handleAuthChange);
        };
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");

        window.dispatchEvent(new Event("authChange"));

        closeMenu();

        window.location.href = "/";
    }

    return (
        <nav className="border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                <Link
                    to="/"
                    onClick={closeMenu}
                    className="flex items-center"
                >
                    <img
                        src={logo}
                        alt="Bara Logo"
                        className="h-14 w-auto object-contain"
                    />
                </Link>

                <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50/80 p-1 md:flex">

                    <Link
                        to="/"
                        className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                            location.pathname === "/"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black"
                        }`}
                    >
                        Home
                    </Link>

                    <Link
                        to="/projects"
                        className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                            location.pathname === "/projects"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black"
                        }`}
                    >
                        Projects
                    </Link>

                    <Link
                        to="/about"
                        className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                            location.pathname === "/about"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black"
                        }`}
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                            location.pathname === "/contact"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black"
                        }`}
                    >
                        Contact
                    </Link>

                    {isLoggedIn && (
                        <Link
                            to="/dashboard"
                            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                                location.pathname.startsWith("/dashboard")
                                    ? "bg-white text-black shadow-sm"
                                    : "text-gray-500 hover:text-black"
                            }`}
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                <div className="hidden md:block">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
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

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? "✕" : "☰"}
                </button>
            </div>

            {isOpen && (
                <div className="border-t border-gray-200 bg-white px-6 py-5 md:hidden">
                    <div className="flex flex-col gap-2">

                        <Link
                            to="/"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                            Home
                        </Link>

                        <Link
                            to="/projects"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                            Projects
                        </Link>

                        <Link
                            to="/about"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                            About
                        </Link>

                        <Link
                            to="/contact"
                            onClick={closeMenu}
                            className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                        >
                            Contact
                        </Link>

                        {isLoggedIn && (
                            <Link
                                to="/dashboard"
                                onClick={closeMenu}
                                className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
                            >
                                Dashboard
                            </Link>
                        )}

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="mt-2 rounded-lg bg-black px-4 py-3 text-center font-medium text-white"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={closeMenu}
                                className="mt-2 rounded-lg bg-black px-4 py-3 text-center font-medium text-white"
                            >
                                Login →
                            </Link>
                        )}

                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;