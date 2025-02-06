import { House, UsersRoundIcon, PawPrintIcon, SunIcon, MoonIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="px-5 py-5 flex items-center justify-between bg-slate-200">
      <div>
        <img src="../../../vite.svg" alt="" />
      </div>
      <div className="flex gap-7">
        <Link to="/" className="flex cursor-pointer items-center gap-2 border-2 p-2 rounded-xl">
          <House />
          Home
        </Link>
        <Link to="/users" className="flex cursor-pointer items-center gap-2 border-2 p-2 rounded-xl">
          <UsersRoundIcon />
          Users
        </Link>
        <Link to="/animals" className="flex cursor-pointer items-center gap-2 border-2 p-2 rounded-xl">
          <PawPrintIcon />
          Animals
        </Link>
      </div>
      <div className="flex gap-5">
        <button className="cursor-pointer">
          <SunIcon />
        </button>
        <button className="cursor-pointer">
          <MoonIcon />
        </button>
      </div>
    </div>
  );
};
