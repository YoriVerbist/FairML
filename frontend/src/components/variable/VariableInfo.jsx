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

  return (
    <>
      <div className="w-80 border-2 m-auto">
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
    </>
  );
}
