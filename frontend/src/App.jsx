import { useState } from "react";
import "./App.css";
import StickyNavbar from "./components/Navbar";
import PatientTableCard from "./components/patient/PatientTableCard";
import PatientDetailCard from "./components/patient/PatientDetailCard";

function App() {
  return (
    <>
      <StickyNavbar />
      <div className="flex flex-row">
        <PatientTableCard />
        <PatientDetailCard />
      </div>
    </>
  );
}

export default App;
