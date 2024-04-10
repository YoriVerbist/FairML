import { Card } from "@material-tailwind/react";

import PatientTable from "./PatientTable";

const PatientTableCard = ({ patients, onRowSelect }) => {
  return (
    <Card className="h-full w-full max-w-[500px] max-h-[400px]">
      <PatientTable patients={patients} onRowSelect={onRowSelect} />
    </Card>
  );
};

export default PatientTableCard;
