import { useState } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";

import VariableInfo from "./VariableInfo";
import VariableBias from "./VariableBias";

export default function ViewVariable({ patients, user }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };

  if (user.id === "") {
    user = {
      id: window.localStorage.getItem("userid"),
      group: "all",
      language: "en",
    };
  }

  return (
    <>
      <Card className="flex flex-col h-full w-[400px] max-h-[850px] border-2 border-blue-gray-100 items-center ">
        <div>
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            View Variables
          </Typography>
        </div>
        <CardBody className="px-0 flex flex-col space-y-4">
          <Typography variant="h6" color="gray">
            Variable Info
          </Typography>
          <VariableInfo
            patients={patients}
            selectedValue={selectedValue}
            onSelectChange={handleSelectChange}
          />
          <Typography variant="h6" color="gray">
            Variable Bias
          </Typography>
          <VariableBias patients={patients} selectedValue={selectedValue} />
        </CardBody>
      </Card>
    </>
  );
}
