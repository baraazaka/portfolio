import { useEffect, useState } from "react";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarActions from "./NavbarActions";
import MobileMenu from "./MobileMenu";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );


    function closeMenu() {
        setIsOpen(false);
    }


    useEffect(() => {
        function handleAuthChange() {
            setIsLoggedIn(
                !!localStorage.getItem("token")
            );
        }

        window.addEventListener(
            "authChange",
            handleAuthChange
        );

        return () => {
            window.removeEventListener(
                "authChange",
                handleAuthChange
            );
        };
    }, []);


    function handleLogout() {
        localStorage.removeItem("token");

        window.dispatchEvent(
            new Event("authChange")
        );

        closeMenu();

        window.location.href = "/";
    }


    return (
        <nav className="border-b border-gray-200/60 bg-white/80 backdrop-blur-md">

            <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

                {/* Logo */}
                <NavbarLogo
                    onClick={closeMenu}
                />


                {/* Desktop Links */}
                <NavbarLinks
                    isLoggedIn={isLoggedIn}
                />


                {/* Desktop Actions */}
                <NavbarActions
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                />


                {/* Mobile Button */}
                <button
                    onClick={() =>
                        setIsOpen(
                            (current) => !current
                        )
                    }
                    className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? "✕" : "☰"}
                </button>

            </div>


            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isOpen}
                isLoggedIn={isLoggedIn}
                onClose={closeMenu}
                onLogout={handleLogout}
            />

        </nav>
    );
}

export default Navbar;