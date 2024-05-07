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
        if (selectedValue === "Age") {
          const occurrenceCount = {};
          occurrenceCount["15-19"] =
            Object.entries(data)
              .filter(([age, _]) => age < 20)
              .map((item) => item[1])
              .reduce((acc, cur) => acc + cur, 0) /
            Object.entries(data)
              .filter(([age, _]) => age < 20)
              .map((item) => item[1]).length;
          occurrenceCount["20-29"] =
            Object.entries(data)
              .filter(([age, _]) => age < 30 && age > 19)
              .map((item) => item[1])
              .reduce((acc, cur) => acc + cur, 0) /
            Object.entries(data)
              .filter(([age, _]) => age < 30 && age > 19)
              .map((item) => item[1]).length;
          occurrenceCount["30-39"] =
            Object.entries(data)
              .filter(([age, _]) => age < 40 && age > 29)
              .map((item) => item[1])
              .reduce((acc, cur) => acc + cur, 0) /
            Object.entries(data)
              .filter(([age, _]) => age < 40 && age > 29)
              .map((item) => item[1]).length;
          occurrenceCount["40-49"] =
            Object.entries(data)
              .filter(([age, _]) => age < 50 && age > 39)
              .map((item) => item[1])
              .reduce((acc, cur) => acc + cur, 0) /
            Object.entries(data)
              .filter(([age, _]) => age < 50 && age > 39)
              .map((item) => item[1]).length;
          occurrenceCount["50-59"] =
            Object.entries(data)
              .filter(([age, _]) => age < 60 && age > 49)
              .map((item) => item[1])
              .reduce((acc, cur) => acc + cur, 0) /
            Object.entries(data)
              .filter(([age, _]) => age < 60 && age > 49)
              .map((item) => item[1]).length;
          occurrenceCount["60-69"] =
            Object.entries(data)
              .filter(([age, _]) => age < 70 && age > 59)
              .map((item) => item[1])
              .reduce((acc, cur) => acc + cur, 0) /
            Object.entries(data)
              .filter(([age, _]) => age < 70 && age > 59)
              .map((item) => item[1]).length;
          occurrenceCount["70-79"] =
            Object.entries(data)
              .filter(([age, _]) => age < 80 && age > 69)
              .map((item) => item[1])
              .reduce((acc, cur) => acc + cur, 0) /
            Object.entries(data)
              .filter(([age, _]) => age < 80 && age > 69)
              .map((item) => item[1]).length;
          occurrenceCount["80-89"] =
            Object.entries(data)
              .filter(([age, _]) => age < 90 && age > 79)
              .map((item) => item[1])
              .reduce((acc, cur) => acc + cur, 0) /
            Object.entries(data)
              .filter(([age, _]) => age < 90 && age > 79)
              .map((item) => item[1]).length;

          setRecurrenceRate(occurrenceCount);
        } else {
          setRecurrenceRate(data);
        }
      });
    }
  }, [selectedValue]);

  const excludeKeys = ["_id", "id", "Recurred"];
  const filteredKeys = Object.keys(patients[0]).filter(
    (key) => !excludeKeys.includes(key),
  );

  return (
    <>
      <div className="w-80 m-auto">
        <Select
          label="Select Variable"
          value={selectedValue}
          onChange={onSelectChange}
        >
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
                  {value < 0.7 ? (
                    <td className="w-1/2">
                      {Math.floor(value.toFixed(3) * 100) + "%"}
                    </td>
                  ) : (
                    <td className="w-1/2 text-red-600 font-bold">
                      {Math.floor(value.toFixed(3) * 100) + "%"}
                    </td>
                  )}
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
