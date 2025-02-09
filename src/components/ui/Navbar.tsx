import { motion } from "framer-motion";
import {
  House as HouseIcon,
  UsersRound as UsersRoundIcon,
  PawPrint as PawPrintIcon,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react";
import companyLogo from "../../assets/companyLogo.svg";
import userIcon from "../../assets/userIcon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <img src={companyLogo} alt="Logo" className="h-8 w-auto" />
          </div>

          <div className="hidden sm:flex sm:space-x-8">
            <NavLink to="/" icon={<HouseIcon />} label="Home" />
            <NavLink to="/users" icon={<UsersRoundIcon />} label="Users" />
            <NavLink to="/animals" icon={<PawPrintIcon />} label="Animals" />
          </div>

          <div className="hidden space-x-4 sm:flex sm:items-center">
            <div className="flex space-x-3">
              <img src={userIcon} alt="user" className="h-8 w-auto" /> 
            </div>
          </div>

          <button
            className="p-2 text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 sm:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="space-y-1 bg-white px-4 pt-2 pb-3 shadow-md sm:hidden"
        >
          <NavLinkMobile to="/" icon={<HouseIcon />} label="Home" />
          <NavLinkMobile to="/users" icon={<UsersRoundIcon />} label="Users" />
          <NavLinkMobile
            to="/animals"
            icon={<PawPrintIcon />}
            label="Animals"
          />
        </motion.div>
      )}
    </nav>
  );
};

const NavLink = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
}) => (
  <Link
    to={to}
    className="flex items-center gap-2 border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-600 duration-150 hover:border-gray-300 hover:text-gray-900"
  >
    {icon} {label}
  </Link>
);

const NavLinkMobile = ({
  to,
  icon,
  label,
}: {
  to: string;
  icon: JSX.Element;
  label: string;
}) => (
  <Link
    to={to}
    className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
  >
    {icon} {label}
  </Link>
);
