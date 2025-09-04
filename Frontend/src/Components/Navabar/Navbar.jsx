import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/home" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/" },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
      
      <h1 className="text-xl font-bold">Email verify</h1>

     
      <ul className="flex gap-6">
        {navLinks.map((link, i) => (
          <li key={i}>
            <Link
              to={link.path}
              className={`${
                location.pathname === link.path
                  ? "text-[#00F1FF] font-semibold" 
                  : "hover:text-[#FFAB3C]"
              } transition-colors duration-300`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
