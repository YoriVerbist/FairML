import { useState, useEffect } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import AdjustVariable from "./AdjustVariable";
import ApplyAdjustments from "./ApplyAdjustments";
import Tooltip from "../Tooltip";

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

  return (
    <>
      <Card className="flex flex-col w-[900px] max-h-[400px] border-2 border-blue-gray-100 h-screen">
        <div>
          <Tooltip
            title="Adjust features"
            content="Select the features that you think are helpful when predicting the recurrence of the throat cancer.
                        Since there are some featues that have some bias in them (e.g. there are more female patients)"
          />
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            Adjust Features
          </Typography>
        </div>
        <CardBody className="flex flex-row space-y-4">
          <div className="flex flex-col space-y-4 w-[900px]">
            <AdjustVariable
              patients={patients}
              checkedItems={checkedItems}
              setCheckedItems={setCheckedItems}
              user={user}
            />
            <div className="m-auto rounded">
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
