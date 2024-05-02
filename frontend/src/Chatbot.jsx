import { useState, useEffect } from "react";
import "./App.css";
import patientService from "./services/patients";
import StickyNavbar from "./components/Navbar";
import PatientTable from "./components/patient/PatientTable";
import ModelOverview from "./components/model/ModelOverview";
import PatientDetail from "./components/patient/PatientDetail";
import ViewVariable from "./components/variable/ViewVariable";
import Chat from "./components/chatbot/Chat";

function Chatbot({ user, setUser }) {
  const [patients, setPatients] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    console.log("Fetching patients...");
    patientService.getAll().then((data) => {
      setPatients(data);
    });
  }, []);

  if (!patients) {
    return null;
  }

  if (user.id === "") {
    user = {
      id: window.localStorage.getItem("userid"),
      group: "all",
      language: "en",
    };
  }

  const handleRowSelect = (patient) => {
    setSelectedPatient(patients.find((p) => p.id === patient));
  };

  return (
    <>
      <StickyNavbar user={user} setUser={setUser} />
      <div className="flex flex-row pt-20 gap-x-10">
        <PatientTable
          patients={patients}
          onRowSelect={handleRowSelect}
          user={user}
        />
        <div className="flex flex-col  gap-y-10">
          <PatientDetail patient={selectedPatient} user={user} />
          <ModelOverview
            patients={patients}
            patient={selectedPatient}
            user={user}
            updateCount={updateCount}
          />
        </div>
      </div>
      <div className="flex flex-row pt-10 gap-x-10">
        <ViewVariable patients={patients} user={user} />
        <div className="flex flex-col  gap-y-10">
          <Chat
            patients={patients}
            user={user}
            setUpdateCount={setUpdateCount}
          />
        </div>
      </div>
    </>
  );
}

export default Chatbot;
