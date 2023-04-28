import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>Poll Management</h1>
      </div>
      <div className="nav">
        <div className="signin">
          <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Sign In
          </NavLink>
        </div>
        <div className="signup">
          <NavLink
            to="/signup"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
