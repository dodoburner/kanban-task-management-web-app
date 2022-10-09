import React from "react";
import logo from "../assets/logo-mobile.svg";
import "../styles/Sidebar.css";
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import HeaderDropdown from "./HeaderDropdown";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo-container">
        <img src={logo} />
        <h3 className="logo-text">kanban</h3>
      </div>
      <HeaderDropdown />

      <div className="toggle-sidebar-container">
        <img src={hideSidebarIcon} />
        <p className="heading-M">Hide Sidebar</p>
      </div>
    </div>
  );
}
