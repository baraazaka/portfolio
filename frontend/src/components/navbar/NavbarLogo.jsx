import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function NavbarLogo({ onClick }) {
    return (
        <Link
            to="/"
            onClick={onClick}
            className="flex items-center"
        >
            <img
                src={logo}
                alt="Bara Logo"
                className="h-14 w-auto object-contain"
            />
        </Link>
    );
}

export default NavbarLogo;