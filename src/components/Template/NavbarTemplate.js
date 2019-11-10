import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { LogOut } from "react-feather";
import { AuthContext } from "../../AuthProvider";

import "./NavbarTemplate.css";

const NavbarTemplate = () => {
  const { state, dispatch } = React.useContext(AuthContext);

  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
        Thông tin cá nhân
      </Link>

      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <Button
            onClick={() =>
              dispatch({
                type: "LOGOUT"
              })
            }
            outline
          >
            {state.login.isAuthenticated && (
              <span>
                Đăng xuất <LogOut />
              </span>
            )}
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarTemplate;
