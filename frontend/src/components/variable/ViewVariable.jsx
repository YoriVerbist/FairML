import { useState } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";

import VariableInfo from "./VariableInfo";
import VariableBias from "./VariableBias";
import Tooltip from "../Tooltip";

export default function ViewVariable({ patients, user }) {
  const [selectedValue, setSelectedValue] = useState("Response");

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
      <Card className="flex flex-col h-full w-[400px] max-h-[850px] border-2 border-blue-gray-100 ">
        <div>
          <Tooltip
            title="View Variables"
            content="Here you can see more details about the variables of each feature. The recurrence rate indicates the probability that a patient with the selected variable will develop a new tumor."
          />
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
          <Tooltip
            title="Variable Bias"
            content="Here you can see the representation bias of each variable. What is representation bias?"
            content2={
              "Representation bias is a mental shortcut we use when we make decisions or judgments. It’s when we think something is more likely if it closely resembles what we typically expect."
            }
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
