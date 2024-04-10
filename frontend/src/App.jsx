import { useState, useEffect } from "react";
import "./App.css";
import patientService from "./services/patients";
import StickyNavbar from "./components/Navbar";
import PatientTableCard from "./components/patient/PatientTableCard";
import PatientDetailCard from "./components/patient/PatientDetailCard";

function App() {
  const [patients, setPatients] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    console.log("Fetching patients...");
    patientService.getAll().then((data) => {
      setPatients(data);
    });
  }, []);

  if (!patients) {
    return null;
  }

  const handleRowSelect = (patient) => {
    setSelectedPatient(patient);
    console.log("selectedPatient", selectedPatient);
  };

  // useEffect(() => {
  //   const foundPatient = patients.find(
  //     (patient) => patient.id === selectedPatient,
  //   );
  //   setSelectedPatient(foundPatient);
  // }, [selectedPatient]);

  return (
    <>
      <StickyNavbar />
      <div className="flex flex-row">
        <PatientTableCard patients={patients} onRowSelect={handleRowSelect} />
        <PatientDetailCard />
      </div>
    </>
  );
}

export default App;
