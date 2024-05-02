import React, { useEffect, useState } from "react";
import Container from "../Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authService from "../../appwrite/auth";
import spinner from "../../assets/spinner.svg";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";

function UserProfile() {
  // Get user name and data from Redux store
  const userName = useSelector((state) => state.auth.userData)?.name;
  const userData = useSelector((state) => state.auth.userData);
  const initials = userName?.charAt(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State variables
  const [menuPopup, setMenuPopup] = useState(false);
  const [loader, setLoader] = useState(false);

  // Toggle menu popup
  const handleMenuPopup = () => {
    setMenuPopup(!menuPopup);
  };

  // Handle logout
  const handleLogOut = () => {
    setLoader(true);
    authService
      .logout()
      .then((response) => {
        dispatch(logout());
        navigate("/login");
        // console.log("Logged Out", response);
        setLoader(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setLoader(false);
      });
  };

  // Log user data when menuPopup changes
  useEffect(() => {
    // console.log("User Data", userData);
  }, [menuPopup]);

  return (
    <Container>
      {/* User profile button */}
      <button onClick={handleMenuPopup} className="flex flex-row gap-2">
        <Container
          className={`rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 w-14 h-14 flex items-center justify-center px-2 py-2 gap-2`}
        >
          <span className={`font-bold text-3xl text-slate-200 pb-1`}>
            {initials}
          </span>
        </Container>
      </button>

      {/* Menu popup */}
      {menuPopup && (
        <Container
          className={`absolute top-0 right-0 w-96 h-full py-0 px-4 bg-black rounded-sm shadow-lg z-10 `}
        >
          {/* User profile */}
          <button
            onClick={handleMenuPopup}
            className="flex flex-row gap-4 px-4 w-full items-center border-b-2 border-slate-700 mb-4 p-6"
          >
            <Container
              className={`rounded-full bg-gradient-to-r from-indigo-500 to-purple-400 w-14 h-14 flex items-center justify-center px-2 py-2 gap-2`}
            >
              <span className={`font-bold text-3xl text-slate-100 pb-1`}>
                {initials}
              </span>
            </Container>

            <Container
              className={
                "flex flex-col gap-1 mt-2 items-start text-slate-200 text-sm"
              }
            >
              <span className={`font-bold pb-1`}>{userName}</span>
              <span className={`font-bold pb-1`}>{userData?.email}</span>
            </Container>

            <i className="fa-solid fa-xmark ml-10 p-2 rounded-lg text-white hover:bg-slate-500 hover:text-white"></i>
          </button>

          {/* Menu options */}
          <ul className="text-md text-slate-200 border-none">
            <li className=" hover:bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-400 cursor-pointer py-1 px-2 rounded-lg">
              <button className="flex flex-row  items-center">
                <i className="fa-solid fa-user p-4 px-4"></i>
                <Link to={`/Account`}>
                  <span>Account</span>
                </Link>
              </button>
            </li>

            <li className=" hover:bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-400  cursor-pointer py-1 px-2 rounded-lg">
              <button className="flex flex-row  items-center">
                <i className="fa-solid fa-cog p-4 px-4"></i>
                <Link to={`/Settings`}>
                  <span>Settings</span>
                </Link>
              </button>
            </li>
            <li className=" hover:bg-gradient-to-r from-indigo-500 via-cyan-500 to-blue-400  cursor-pointer py-1 px-2 rounded-lg">
              <button className="flex flex-row  items-center">
                <i className="fa-solid fa-bell p-4 px-4"></i>
                <Link to={`/Notifications`}>
                  <span>Notifications</span>
                </Link>
              </button>
            </li>
            <li
              className={` ${
                loader ? "bg-slate-600" : null
              }   cursor-pointer py-1 px-2 border-t-2 border-slate-700 mt-5 rounded-lg`}
            >
              <button
                className="flex flex-row  items-center w-full rounded-lg mt-2 py-1 hover:bg-gradient-to-r from-red-500 via-orange-500 to-pink-400"
                onClick={handleLogOut}
              >
                {!loader ? (
                  <i className="fa-solid fa-right-from-bracket p-4 px-4"></i>
                ) : null}
                <Link to={`/`}>
                  {!loader ? (
                    <span>Logout</span>
                  ) : (
                    <img
                      src={spinner}
                      alt="spinner"
                      className="w-10 h-10 my-1 animate-spin"
                    />
                  )}
                </Link>
              </button>
            </li>
          </ul>
        </Container>
      )}
    </Container>
  );
}

export default UserProfile;
