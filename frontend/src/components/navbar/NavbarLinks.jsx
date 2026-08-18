import { Link, useLocation } from "react-router-dom";

function NavbarLinks({ isLoggedIn }) {
    const location = useLocation();

    const links = [
        {
            name: "Home",
            path: "/",
            active: location.pathname === "/",
        },
        {
            name: "Projects",
            path: "/projects",
            active: location.pathname === "/projects",
        },
        {
            name: "About",
            path: "/about",
            active: location.pathname === "/about",
        },
        {
            name: "Contact",
            path: "/contact",
            active: location.pathname === "/contact",
        },
    ];

    return (
        <div className="hidden items-center gap-2 rounded-full border border-gray-200 bg-gray-50/80 p-1 md:flex">

            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                        link.active
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-500 hover:text-black"
                    }`}
                >
                    {link.name}
                </Link>
            ))}

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
    );
}

export default NavbarLinks;