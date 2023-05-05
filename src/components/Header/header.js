import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="logo">
        <h1>Poll Management</h1>
      </div>
      <div className="nav">
        <div className="signin">
          <div
            onClick={() => navigate("/")}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Sign In
          </div>
        </div>
        <div className="signup">
          <div
            onClick={() =>{
              navigate("./signup")}}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Sign Up
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
