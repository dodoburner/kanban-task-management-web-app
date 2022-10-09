import React, { useState } from "react";
import logo from "../assets/logo-mobile.svg";
import "../styles/Sidebar.css";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import HeaderDropdown from "./HeaderDropdown";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen((curr) => !curr);
  };

  return (
    <div className="sidebar">
      {isOpen && <HeaderDropdown />}
      <div className="toggle-sidebar-container sidebar-closed">
        <img src={isOpen ? hideSidebarIcon : showSidebarIcon} />
        {isOpen && <p className="heading-M">Hide Sidebar</p>}
      </div>
    </div>
  );
}
