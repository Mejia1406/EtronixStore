import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Success from "./pages/Success.jsx";
import Failure from "./pages/Failure.jsx";
import Pending from "./pages/Pending.jsx";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/success", element: <Success /> },
  { path: "/failure", element: <Failure /> },
  { path: "/pending", element: <Pending /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
