import { Card } from "@material-tailwind/react";

import PatientDetail from "./PatientDetail";

export default function PatientDetailCard() {
  return (
    <Card className="h-full w-full max-w-[700px] max-h-[400px]">
      <PatientDetail />
    </Card>
  );
}
