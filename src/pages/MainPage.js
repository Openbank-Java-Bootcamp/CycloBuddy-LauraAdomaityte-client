import React from "react";
import Sidebar from "../components/Sidebar";
import pic from "../images/pic2.jpg";

function MainPage(props) {
  return (
    <div className="Mainpage">
      <Sidebar />
      <div>
        <h3 className="top-right-main">Welcome to CycloBuddy!</h3>
        <img className="Mainpage-pic" src={pic} alt="cyclists pic" />
      </div>
    </div>
  );
}

export default MainPage;
