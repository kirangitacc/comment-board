import { useNavigate } from "react-router-dom";
import "./index.css";

function Header({ user }) {
  const navigate = useNavigate();
  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-s-box">
          <span className="logo-s">S</span>
        </span>
        <span className="logo-text">WIFT</span>
      </div>
      <div className="profile" onClick={() => navigate("/profile")}>
        <span className="profile-initials">{initials}</span>
        <span className="profile-name">{user?.name}</span>
      </div>
    </header>
  );
}

export default Header;