import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function DashboardSidebar({ user }) {
    const links = [
        {
            name: "Overview",
            path: "/dashboard"
        },
        {
            name: "Profile",
            path: "/dashboard/profile"
        },
        {
            name: "Portfolio",
            path: user?.username
                ? `/portfolio/${user.username}`
                : "#"
        },
        {
            name: "Projects",
            path: "/dashboard/projects"
        },
        {
            name: "Skills",
            path: "/dashboard/skills"
        },
        {
            name: "Experience",
            path: "/dashboard/experience"
        },
        {
            name: "Messages",
            path: "/dashboard/messages"
        }
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-gray-200 bg-white md:block">

            <div className="flex h-full flex-col p-6">

                {/* Logo */}
                <div className="mb-8">
                    <Link
                        to="/dashboard"
                        className="flex items-center"
                    >
                        <img
                            src={logo}
                            alt="Bara Logo"
                            className="h-14 w-auto object-contain"
                        />
                    </Link>

                    <p className="mt-2 text-sm text-gray-500">
                        Portfolio Dashboard
                    </p>
                </div>


                {/* Navigation */}
                <nav className="flex flex-col gap-2">

                    {links.map((link) => {
                        const isPortfolio =
                            link.name === "Portfolio";

                        if (isPortfolio) {
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                                >
                                    Portfolio
                                </Link>
                            );
                        }

                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.path === "/dashboard"}
                                className={({ isActive }) =>
                                    `rounded-xl px-4 py-3 text-sm font-medium transition ${
                                        isActive
                                            ? "bg-black text-white"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        );
                    })}

                </nav>


                {/* Bottom */}
                <div className="mt-auto border-t border-gray-200 pt-5">

                    <Link
                        to="/"
                        className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        ← Back to website
                    </Link>

                </div>

            </div>

        </aside>
    );
}

export default DashboardSidebar;