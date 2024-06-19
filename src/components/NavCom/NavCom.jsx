import React, { useState } from "react";

import { SiSession } from "react-icons/si";
import { PiHamburgerBold } from "react-icons/pi";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { MdSpaceDashboard } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineWorkHistory } from "react-icons/md";
import { MdViewWeek } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { Link, NavLink } from "react-router-dom";

function NavCom() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="bg-[#333] relative flex justify-between px-6 py-2">
      <div>
        <SiSession className="text-white text-3xl" />
      </div>

      <div
        className={`absolute bg-white w-[50vw] top-0 right-0 left-0 ${
          isMenuOpen
            ? "translate-x-[0%] opacity-100"
            : "translate-x-[-100%] opacity-0"
        } flex flex-col justify-center items-start gap-7 z-50 rounded-md shadow-md p-9
          transition-all duration-300

        `}
      >
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <MdSpaceDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/add-student" className="flex items-center gap-3">
          <PiStudentBold />
          <span>Add Student</span>
        </NavLink>

        <NavLink to="/add-session" className="flex items-center gap-3">
          <MdOutlineWorkHistory />
          <span>Add Session</span>
        </NavLink>

        <NavLink to="/view-session" className="flex items-center gap-3">
          <MdViewWeek />
          <span>View Session</span>
        </NavLink>

        <NavLink onClick={()=>{
          
        }} className="flex items-center gap-3">
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
