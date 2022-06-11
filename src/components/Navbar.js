import React from "react";
import { Layout } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";
const { Header } = Layout;

function Navbar() {
  
  return (
    <div>
      <Layout>
        
        <Header>
          <Link to="/login">
            <Button ghost>Login</Button>
          </Link>

          <Link to="/signup">
            <Button ghost>Sign up</Button>
          </Link>
        </Header>
      </Layout>
    </div>
  );
}

export default Navbar;
