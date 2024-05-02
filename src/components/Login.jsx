import React, { useState } from "react";
import Container from "./Container";
import authService from "../appwrite/auth";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import Logo from "./Logo";
import spinner from "../assets/spinner.svg";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one uppercase letter and number"
      );
      setLoading(false);
      return;
    }

    // Submit the form
    authService
      .login({ email: email, password: password })
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
    <Container
      className={"w-full h-full flex flex-col items-center justify-center"}
    >
      <form
        onSubmit={handleSubmit}
        className=" gap-2 flex items-center justify-center flex-col h-2/5 max-h-[360px] px-10 mb-24 rounded-lg bg-slate-200 shadow-lg text-black"
      >
        <Logo className={`mb-4 p-4 rounded-full bg-slate-700`} />

        <Container className={`my-2`}>
          <Container className={"flex flex-row"}>
            <label htmlFor="email" className="p-2 w-32 font-bold">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="p-2 outline-none w-64"
            />
          </Container>
          {emailError && (
            <p className="text-red-500 text-sm text-center mt-2 pl-4">
              {emailError}
            </p>
          )}
        </Container>

        <Container className={`my-2`}>
          <Container className={"flex flex-row"}>
            <label htmlFor="password" className="p-2 w-32 font-bold">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="p-2 outline-none w-64"
            />
          </Container>

          {passwordError && (
            <p className="text-red-500 text-sm text-center mt-2 pl-4">
              {passwordError}
            </p>
          )}
        </Container>

        {loading ? (
          <button
            type="button"
            className="w-full p-2 bg-slate-700 rounded-lg text-white font-bold mt-6 flex flex-row items-center justify-center"
            disabled
          >
            <img
              src={spinner}
              alt="loading spinner"
              className="w-6 h-6 animate-spin"
            />
            Loging in...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full p-2 bg-slate-700 rounded-lg text-white font-bold mt-6"
          >
            Login
          </button>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </form>
    </Container>
  );
}

export default Login;
