import { Card } from "@material-tailwind/react";

import PatientTable from "./PatientTable";

export default function PatientTableCard() {
  return (
    <Card className="h-full w-full max-w-[500px] max-h-[400px]">
      <PatientTable />
    </Card>
  );
}
