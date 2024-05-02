import { Card, Typography, CardBody } from "@material-tailwind/react";

import PatientDetailChart from "./PatientDetailChart";
import Tooltip from "../Tooltip";

const KEYS = [
  "id",
  "Gender",
  "Age",
  "Smoking",
  "History Radiotherapy",
  "Thyroid Function",
  "Physical Examination",
  "Adenopathy",
  "Pathology",
  "Focality",
  "Risk",
  "Stage",
  "Response",
];

export default function PatientDetail({ patient, user }) {
  if (!patient) {
    return (
      <>
        <Card className="flex flex-col w-[900px] h-300 border-2 border-blue-gray-100">
          <div>
            <Tooltip
              title="Patients Details"
              content="Here you can see the details of the patient you selected in the table. You also see the recurrence risk of the patient (the chance that the patient will develop a new tumor)."
            />
            <Typography variant="h4" color="gray" className="mt-4 uppercase">
              Patient Details
            </Typography>
          </div>
          <CardBody>
            <div className="p-4 ">
              <Typography
                variant="h4"
                color="gray"
                className="mt-4 text-gray-400"
              >
                No patient selected
              </Typography>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }

  const renderKeyValuePairs = () => {
    return KEYS.map((key) => (
      <div key={key} className="flex h-12  text-left align-bottom mb-2">
        <div className="w-1/2 font-semibold">{key}:</div>
        <div className="w-1/2 pl-2 leading-4">{patient[key]}</div>
      </div>
    ));
  };

  // Calculate the number of rows per column
  const numRowsPerColumn = Math.ceil(KEYS.length / 4);

  // Split the key-value pairs into three columns
  const column1 = renderKeyValuePairs().slice(0, numRowsPerColumn);
  const column2 = renderKeyValuePairs().slice(
    numRowsPerColumn,
    2 * numRowsPerColumn,
  );
  const column3 = renderKeyValuePairs().slice(
    2 * numRowsPerColumn,
    3 * numRowsPerColumn,
  );
  // Function to render a single column
  const renderColumn = (columnData) => {
    return <div className="flex flex-col">{columnData}</div>;
  };

  return (
    <>
      <div>
        <Card className="flex flex-col h-full w-[900px]  max-h-[300px] border-2 border-blue-gray-100">
          <div>
            <Tooltip
              title="Patients Details"
              content="Here you can see the details of the patient you selected in the table. You also see the recurrence risk of the patient (the chance that the patient will develop a new tumor)."
            />
            <Typography variant="h4" color="gray" className="mt-4 uppercase">
              Patient Details
            </Typography>
          </div>
          <CardBody className="">
            <div className="flex">
              <div className="w-1/3">{renderColumn(column1)}</div>
              <div className="w-1/3">{renderColumn(column2)}</div>
              <div className="w-1/3">{renderColumn(column3)}</div>
              <div className="pb-2 grid place-items-center px-2 mb-4">
                <PatientDetailChart patient={patient} user={user} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
