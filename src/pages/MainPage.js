import React from "react";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;

function MainPage(props) {
  return (
    <div>
      <Layout>
        <Sider theme='light' className="sider">Sider</Sider>
        <Content>Content</Content>
      </Layout>
    </div>
  );
}

export default MainPage;
