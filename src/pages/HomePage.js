import React, { useContext } from "react";
import { Layout } from "antd";
import pic from "../images/pic1.jpg";
import Sidebar from "../components/Sidebar";
import video from "../images/main-video.mp4";
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
           <h3 className="top-right-main-text">Welcome to CycloBuddy!</h3> 
          <video autoPlay muted className="homepage-video"><source src={video} /></video>
         
          
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
