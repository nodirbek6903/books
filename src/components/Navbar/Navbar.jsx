import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import "./Navbar.css";
import { logout } from "../../auth/authSlice/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [email, setEmail] = useState("");
  const host_url = "https://no23.lavina.tech";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const key = localStorage.getItem("Key");
      const secret = localStorage.getItem("Secret");
      const method = "GET";
      const url = "/myself";
      const stringToSign = `${method}${url}${secret}`;
      const response = await fetch(`${host_url}/myself`, {
        method: method,
        headers: {
          Key: key,
          Sign: CryptoJS.MD5(stringToSign).toString(),
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setEmail(data.email);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signup");
  };
  return (
    <div className="navbar-container">
      <div className="navbars">
        <h3>Email: {email}</h3>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
