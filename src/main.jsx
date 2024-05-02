//react
import React from "react";
import ReactDOM from "react-dom/client";
//css
import "./index.css";
// redux
import { Provider } from "react-redux";
import store from "./store/store.js";
// router
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// components + pages
import HeroPage from "./pages/HeroPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import App from "./App.jsx";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HeroPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/home",
        element: <HomePage />,
        children: [
          {
            path: ":collectionId",
            element: <HomePage />,
            children: [
              {
                path: ":query",
                element: <HomePage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  </React.StrictMode>
);
