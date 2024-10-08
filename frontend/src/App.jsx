import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard.jsx";
import Chatbot from "./Chatbot.jsx";
import Info from "./components/Info.jsx";
import Landing from "./Landing.jsx";
import ErrorPage from "./error-page";

function App() {
  const [user, setUser] = useState({
    id: "",
    group: "all",
    language: "en",
  });

  const router = createBrowserRouter([
    {
      path: "/FairML/",
      element: <Landing user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/FairML/dashboard",
      element: <Dashboard user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/FairML/chatbot",
      element: <Chatbot user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/FairML/info",
      element: <Info user={user} setUser={setUser} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
