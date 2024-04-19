import { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import modelService from "../../services/imporances";

export default function VariableInfo({
  patients,
  selectedValue,
  onSelectChange,
}) {
  const [recurrenceRate, setRecurrenceRate] = useState([]);

  useEffect(() => {
    if (selectedValue) {
      console.log("Calculating feature recurrence rate...");
      modelService.getRecurrence(selectedValue).then((data) => {
        setRecurrenceRate(data);
        console.log("Reucrrence rate", data);
      });
    }
  }, [selectedValue]);

  const excludeKeys = ["_id", "id", "Recurred"];
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
        {selectedValue ? (
          <table className="w-full">
            <thead>
              <tr className="flex w-full">
                {selectedValue ? (
                  <th className="w-1/2 p-2">{selectedValue}</th>
                ) : (
                  <th className="w-1/2 p-2">Feature Name</th>
                )}
                <th className="w-1/2 p-2">Recurrence Rate</th>
              </tr>
            </thead>
            <tbody className="flex flex-col items-center justify-between overflow-y-scroll w-full max-h-48">
              {Object.entries(recurrenceRate).map(([key, value]) => (
                <tr key={key} className="flex w-full mb-2">
                  <td className="w-1/2">{key}</td>
                  <td className="w-1/2">
                    {Math.floor(value.toFixed(3) * 100) + "%"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Select a variable to see recurrence rate</p>
        )}
      </div>
    </>
  );
}
