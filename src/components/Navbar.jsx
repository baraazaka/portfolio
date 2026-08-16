import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    return (
        <nav className="border-b border-gray-200 bg-white">
            <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                <Link to="/" className="flex items-center">
                    <img
                        src={logo}
                        alt="Bara Logo"
                        className="h-14 w-auto object-contain"
                    />
                </Link>

                <div className="flex items-center gap-6 lg:gap-8">
                    <Link
                        to="/"
                        className="text-sm font-medium text-gray-600 transition hover:text-black"
                    >
                        Home
                    </Link>

                    <Link
                        to="/projects"
                        className="text-sm font-medium text-gray-600 transition hover:text-black"
                    >
                        Projects
                    </Link>

                    <Link
                        to="/about"
                        className="text-sm font-medium text-gray-600 transition hover:text-black"
                    >
                        About
                    </Link>

                    <Link
                        to="/contact"
                        className="text-sm font-medium text-gray-600 transition hover:text-black"
                    >
                        Contact
                    </Link>

                    <Link
                        to="/login"
                        className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Login
                    </Link>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;