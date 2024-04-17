import { useState, useEffect } from "react";
import "./App.css";
import patientService from "./services/patients";
import StickyNavbar from "./components/Navbar";
import PatientTable from "./components/patient/PatientTable";
import PatientDetail from "./components/patient/PatientDetail";
import ViewVariable from "./components/variable/ViewVariable";
import VariableOverview from "./components/variable/VariableOverview";

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
    setSelectedPatient(patients.find((p) => p.id === patient));
    console.log("selectedPatient", selectedPatient);
  };

  return (
    <>
      <StickyNavbar />
      <div className="flex flex-row pt-20 gap-x-10">
        <PatientTable patients={patients} onRowSelect={handleRowSelect} />
        <PatientDetail patient={selectedPatient} />
      </div>
      <div className="flex flex-row pt-10 gap-x-10">
        <ViewVariable patients={patients} />
        <VariableOverview patients={patients} />
      </div>
    </>
  );
}

export default App;
