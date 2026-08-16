import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    const location = useLocation();

    return (
        <nav className="border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        alt="Bara Logo"
                        className="h-14 w-auto object-contain"
                    />
                </Link>

                {/* Navigation */}
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

                </div>

                {/* CTA */}
               <Link
    to="/login"
    className="hidden rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:scale-105 hover:bg-gray-800 md:block"
>
    Login →
</Link>

            </div>
        </nav>
    );
}

export default Navbar;