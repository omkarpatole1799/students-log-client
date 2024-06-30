import React, { useState } from "react";

import { SiSession } from "react-icons/si";
import { PiHamburgerBold } from "react-icons/pi";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { MdSpaceDashboard } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineWorkHistory } from "react-icons/md";
import { MdViewWeek } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  {
    menuName: "Dashboard",
    icon: <MdSpaceDashboard />,
    link: "dashboard",
  },

  {
    menuName: "View Session",
    icon: <MdViewWeek />,
    link: "dashboard/view-session",
  },

  {
    menuName: "Add Session",
    icon: <MdOutlineWorkHistory />,
    link: "dashboard/add-session",
  },
  {
    menuName: "Add Student",
    icon: <PiStudentBold />,
    link: "dashboard/add-student",
  },
];

function NavCom() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="bg-[#333] relative flex justify-between px-6 py-2">
      <Link to="/dashboard">
        <SiSession className="text-white text-3xl" />
      </Link>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/30" onClick={toggleMenu}></div>
      )}

      <div
        className={`absolute bg-white w-fit top-0 right-0 left-0 ${
          isMenuOpen
            ? "translate-x-[0%] opacity-100"
            : "translate-x-[-100%] opacity-0"
        } flex flex-col justify-center items-start gap-7 z-50 rounded-md shadow-md p-9
          transition-all duration-300

        `}
      >
        <AiOutlineCloseCircle
          className="align-self-end text-2xl cursor-pointer"
          onClick={toggleMenu}
        />

        {NAV_ITEMS.map(el => {
          return (
            <NavLink
              to={`/${el.link}`}
              className="flex items-center gap-3"
              onClick={toggleMenu}
            >
              {el.icon}
              <span>{el.menuName}</span>
            </NavLink>
          );
        })}

        <NavLink className="flex items-center gap-3" onClick={logout}>
          <LuLogOut />
          <span>Logout</span>
        </NavLink>
      </div>
      <button>
        {isMenuOpen ? (
          <AiOutlineCloseCircle
            className="text-white text-3xl"
            onClick={toggleMenu}
          />
        ) : (
          <PiHamburgerBold
            className="text-white text-3xl"
            onClick={toggleMenu}
          />
        )}
      </button>
      
    </div>
  );
}

export default NavCom;
