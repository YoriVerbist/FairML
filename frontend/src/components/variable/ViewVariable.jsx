import { useState } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";

import VariableInfo from "./VariableInfo";
import VariableBias from "./VariableBias";

export default function ViewVariable({ patients }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    console.log(selectedValue);
  };

  return (
    <>
      <Card className="flex flex-col h-full w-full max-w-[400px] max-h-[300px] border-2 border-blue-gray-100">
        <div>
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            Patients
          </Typography>
        </div>
        <CardBody className="px-0 flex flex-col space-y-4">
          <VariableInfo
            patients={patients}
            selectedValue={selectedValue}
            onSelectChange={handleSelectChange}
          />
          <VariableBias />
        </CardBody>
      </Card>
    </>
  );
}
