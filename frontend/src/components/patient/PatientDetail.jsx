import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
} from "@material-tailwind/react";

import PatientDetailChart from "./PatientDetailChart";

const KEYS = [
  "id",
  "Gender",
  "Age",
  "Smoking",
  "Hx Radiothreapy",
  "Thyroid Function",
  "Physical Examination",
  "Adenopathy",
  "Pathology",
  "Focality",
  "Risk",
  "Stage",
  "Response",
];

export default function PatientDetail({ patient }) {
  if (!patient) {
    return (
      <>
        <Card className="flex flex-col h-full w-full max-w-[900px] h-300 border-2 border-blue-gray-100">
          <div>
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
      <div key={key} className="flex mb-2">
        <div className="w-1/2 font-semibold">{key}:</div>
        <div className="w-1/2">{patient[key]}</div>
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
        <Card className="flex flex-col h-full w-full max-w-[900px] max-h-[300px] border-2 border-blue-gray-100">
          <div>
            <Typography variant="h4" color="gray" className="mt-4 uppercase">
              Patient Details
            </Typography>
          </div>
          <CardBody>
            <div className="flex">
              <div className="w-1/3">{renderColumn(column1)}</div>
              <div className="w-1/3">{renderColumn(column2)}</div>
              <div className="w-1/3">{renderColumn(column3)}</div>
              <div className="mb-2 grid place-items-center px-2">
                <PatientDetailChart patient={patient} />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
