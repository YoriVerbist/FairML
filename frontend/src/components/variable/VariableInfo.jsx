import { useState } from "react";
import { Select, Option } from "@material-tailwind/react";

export default function VariableInfo({
  patients,
  selectedValue,
  onSelectChange,
}) {
  const excludeKeys = ["_id", "id"];
  const filteredKeys = Object.keys(patients[0]).filter(
    (key) => !excludeKeys.includes(key),
  );

  const uniqueValues = [
    ...new Set(patients.map((patient) => patient[selectedValue])),
  ];

  return (
    <>
      <div className="w-80 m-auto">
        <Select label="Select Variable" onChange={onSelectChange}>
          {filteredKeys.map((key, index) => {
            return (
              <Option key={index} value={key} className="text-center">
                {key}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="border-2 w-80 m-auto rounded">
        <table className="w-full">
          <thead>
            <tr className="flex w-full">
              <th className="w-1/2 p-2">{selectedValue}</th>
              <th className="w-1/2 p-2">Feature Importance</th>
            </tr>
          </thead>
          <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full max-h-48">
            {uniqueValues.map((value, index) => (
              <tr key={index} className="flex w-full mb-2">
                <td className="w-1/2">{value}</td>
                <td className="w-1/2">0.5</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
