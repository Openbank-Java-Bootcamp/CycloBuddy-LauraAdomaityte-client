import React, { useContext } from "react";
import { Layout } from "antd";
import pic from "../images/pic1.jpg";
import Sidebar from "../components/Sidebar";
import pic1 from "../images/pic2.jpg";
import { AuthContext } from "../context/auth.context";
const { Content } = Layout;

function HomePage() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      
      {isLoggedIn && (
        <div className="Mainpage">
        <Sidebar />
        <div>
          <h3 className="top-right-main">Welcome to CycloBuddy!</h3>
          <img className="Mainpage-pic" src={pic1} alt="cyclists pic" />
        </div>
      </div>
      )}
      
    
      {!isLoggedIn && (
        <Content className="container">
          <h3 className="top-right">The best way to find cycling buddies</h3>
          <img className="navPic" src={pic} alt="cyclists pic" />
        </Content>
      )}
    </div>
  );
}

export default HomePage;
