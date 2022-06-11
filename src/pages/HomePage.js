import React from 'react';
import { Layout } from "antd";
import pic from "../images/pic1.jpg";
const { Content } = Layout;

function HomePage(props) {
    return (
        <div>
             <Content className="container">
          <h3 className="top-right">The best way to find cycling buddies</h3>
          <img className="navPic" src={pic} alt="cyclists pic" />
        </Content>
        </div>
    );
}

export default HomePage;