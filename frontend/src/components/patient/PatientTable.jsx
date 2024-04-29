import { useState } from "react";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";

import Tooltip from "../Tooltip.jsx";

const PatientTable = ({ patients, onRowSelect, user }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    onRowSelect(patient);
  };

  const TABLE_HEAD = ["Id", "Name", "Gender", "Risk", "Recurred"];

  return (
    <>
      <Card className="flex flex-col h-full w-[400px] max-h-[540px] border-2 border-blue-gray-100">
        <div>
          <Tooltip
            title="Patients Table"
            content="You can select here a patient and see more details about the patient in the card to the right."
          />
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            Patients
          </Typography>
        </div>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map((item, index) => {
                const isLast = index === patients.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={item.id}
                    className={`cursor-pointer ${
                      selectedPatient === item.id ? "bg-blue-200" : ""
                    } hover:bg-gray-100`}
                    onClick={() => handleRowClick(item.id)}
                  >
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.Age}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.Gender}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.Risk}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {item.Recurred}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </>
  );
};

export default PatientTable;
