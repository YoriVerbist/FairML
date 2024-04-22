import { useState, useEffect } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import AdjustVariable from "./AdjustVariable";
import ApplyAdjustments from "./ApplyAdjustments";
import userService from "../../services/users";

export default function AdjustSlider({ patients, updateCount, user }) {
  const excludeKeys = ["_id", "id", "Recurred"];
  const filteredKeys = Object.keys(patients[0]).filter(
    (key) => !excludeKeys.includes(key),
  );

  const selectAll = filteredKeys.reduce((acc, value) => {
    acc[value] = true;
    return acc;
  }, {});

  const [checkedItems, setCheckedItems] = useState(selectAll);
  console.log("checkedItems", checkedItems);

  return (
    <>
      <Card className="flex flex-col w-[900px] max-h-[400px] border-2 border-blue-gray-100 items-center h-screen">
        <div>
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            Adjust Features
          </Typography>
        </div>
        <CardBody className="px-0 flex flex-col space-y-4">
          <div className="flex flex-row space-x-2">
            <AdjustVariable
              patients={patients}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              user={user}
            />
            <div className="w-[370px] h-[300px] m-auto rounded">
              <ApplyAdjustments
                patients={patients}
                changes={checkedItems}
                setUpdateCount={updateCount}
                user={user}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
