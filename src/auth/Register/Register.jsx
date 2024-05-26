import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  signup } from "../authSlice/authSlice";
import { FaEyeSlash, FaEye, FaRegUser, FaKey } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [secret, setSecret] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [isType, setIsType] = useState(true);
  const navigate = useNavigate();


  const handleTypeChange = () => {
    setIsType(!isType);
  };

  if(error){
    return <div>Error: {error}</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ name: firstname, email, key, secret }));
    navigate("/");
  };
  return (
    <div className="reg-container">
      <div className="form-container">
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleSubmit} className="reg-form">
          <div className="inputs">
            <label htmlFor="name">Name:</label>
            <div className="name-input-icons">
              <FaRegUser className="input-icons" />
              <input
                type="text"
                id="name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="inputs">
            <label htmlFor="email">Email:</label>
            <div className="email-input-icons">
              <MdEmail className="input-icons" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="inputs">
            <label htmlFor="key">Key:</label>
            <div className="key-input-icons">
              <FaKey className="input-icons" />
              <input
                type="text"
                id="key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="inputs">
            <label htmlFor="secret">Password:</label>
            <div className="password-input-icons">
              <input
                type={isType ? "password" : "text"}
                id="secret"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                required
              />
              {isType ? (
                <FaEyeSlash
                  className="input-icons"
                  onClick={handleTypeChange}
                />
              ) : (
                <FaEye className="input-icons" onClick={handleTypeChange} />
              )}
            </div>
          </div>
          <button type="submit" className="reg-btn" disabled={loading}>
            {loading ? "Sign Up..." : "Sign Up"}
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
