import React from "react";
import { SidebarData } from "./SidebarData";

function Sidebar() {
  return (
    <div className="SideBar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="SidebarRow"
              id={window.location.pathname == val.link ? "active" : ""}
              onClick={() => (window.location.pathname = val.link)}
            >
              <div>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
