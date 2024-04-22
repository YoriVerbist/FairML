import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard.jsx";
import Landing from "./Landing.jsx";
import ErrorPage from "./error-page";
import Signup from "./Signup.jsx";

function App() {
  const [user, setUser] = useState({
    id: "",
    group: "all",
    language: "en",
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "dashboard",
      element: <Dashboard user={user} setUser={setUser} />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
