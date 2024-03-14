import { useState } from "react";
import "./App.css";
import StickyNavbar from "./components/Navbar";
import PatientCard from "./components/patient/PatientCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <StickyNavbar />
      <PatientCard />
    </>
  );
}

export default App;
