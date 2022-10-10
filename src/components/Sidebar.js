import React from "react";
import "../styles/Sidebar.css";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import HeaderDropdown from "./HeaderDropdown";

export default function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div className={`sidebar  ${!isSideBarOpen && "sidebar-closed"}`}>
      {isSideBarOpen && <HeaderDropdown />}
      <div
        className={`toggle-sidebar-container  ${
          !isSideBarOpen && "toggle-closed"
        }`}
        onClick={() => toggleSidebar()}
      >
        <img
          src={isSideBarOpen ? hideSidebarIcon : showSidebarIcon}
          alt="show/hide sidebar icon"
        />
        {isSideBarOpen && <p className="heading-M">Hide Sidebar</p>}
      </div>
    </div>
  );
}
