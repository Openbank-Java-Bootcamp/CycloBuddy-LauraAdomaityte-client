import React, { useContext } from "react";
import { Layout } from "antd";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
const { Header } = Layout;

function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <Layout>
        {isLoggedIn && (
          <Header>
            <Button ghost onClick={logOutUser}>
            Logout
          </Button>
          </Header>
          
        )}

        {!isLoggedIn && (
          <Header>
            <Link to="/">
              <Button ghost>Home</Button>
            </Link>
            <Link to="/login">
              <Button ghost>Login</Button>
            </Link>

            <Link to="/signup">
              <Button ghost>Sign up</Button>
            </Link>
          </Header>
        )}
      </Layout>
    </div>
  );
}

export default Navbar;
