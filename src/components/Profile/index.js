import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((users) => {
        setUser(users[0]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header user={user} />
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <ThreeDots
            height="60"
            width="60"
            radius="9"
            color="#4caf50"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div>
      <Header user={user} />
      <div className="profile-container">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Welcome,{user.name}
        </button>
        <div className="profile-card">
          <div className="profile-avatar">
            <span>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
            <div className="profile-title">
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
            </div>
          </div>
          <div className="profile-info">
            <div>
              <label>User ID</label>
              <div className="profile-value">{user.id}</div>
            </div>
            <div>
              <label>Name</label>
              <div className="profile-value">{user.name}</div>
            </div>
            <div>
              <label>Email ID</label>
              <div className="profile-value">{user.email}</div>
            </div>
            <div>
              <label>Address</label>
              <div className="profile-value">
                {user.address.street}, {user.address.city}
              </div>
            </div>
            <div>
              <label>Phone</label>
              <div className="profile-value">{user.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;