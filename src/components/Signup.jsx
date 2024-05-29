import React, { useState } from "react";
import Container from "./Container";
import authService from "../appwrite/auth";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import Logo from "./Logo";
import spinner from "../assets/spinner.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
      setLoading(false);
      return;
    }
    // Validate password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter and number"
      );
      setLoading(false);
      return;
    }
    // Submit the form
    authService
      .createAccount({ email: email, password: password, name: name })
      .then((res) => {
        navigate("/home/1");

        dispatch(login(res));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <Container className="bg-gradient-to-r from-violet-800 to-indigo-950 ">
      <div className="flex flex-col items-center justify-center h-screen">
        <Container className={"flex flex-row gap-2 items-center mb-4"}>
          <Logo className={"mb-0"} />
          <h1 className="text-2xl">WebMarkers</h1>
        </Container>
        <form
          className="flex flex-col gap-4 p-8 bg-white rounded-md w-[420px]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name" className="text-slate-600">
            Name
          </label>
          <input
            id="name"
            className="p-2 rounded-md text-slate-400 border border-slate-200"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
          <p className="text-red-500">{nameError}</p>
          <label htmlFor="email" className="text-slate-600">
            Email
          </label>
          <input
            id="email"
            className="p-2 rounded-md text-slate-400 border border-slate-200"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <p className="text-red-500">{emailError}</p>
          <label htmlFor="password" className="text-slate-600">
            Password
          </label>
          <input
            id="password"
            className="p-2 rounded-md text-slate-400 border border-slate-200"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
          <p className="text-red-500">{passwordError}</p>
          <Container className={"flex flex-row gap-2"}>
            <button
              className="p-2 w-3/5 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <img
                    className="h-6 w-6 animate-spin"
                    src={spinner}
                    alt="loading"
                  />
                  Signing In..
                </span>
              ) : (
                "Sign In"
              )}
            </button>
            <Link
              to={"/login"}
              className=" text-center p-2 w-2/5 rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
            >
              Login
            </Link>
          </Container>
          <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
      </div>
    </Container>
  );
}

export default Signup;
