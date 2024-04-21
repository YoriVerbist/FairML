import { Checkbox } from "@material-tailwind/react";

export default function AdjustVariable({
  patients,
  checkedItems,
  setCheckedItems,
}) {
  const excludeKeys = ["_id", "id", "Recurred"];
  const filteredKeys = Object.keys(patients[0]).filter(
    (key) => !excludeKeys.includes(key),
  );

  const handleCheckboxChange = (value) => {
    setCheckedItems({
      ...checkedItems,
      [value]: !checkedItems[value], // Toggle the checked state
    });
  };

  return (
    <>
      <div className="border-2 w-[370px] h-[300px] m-auto rounded space-y-4">
        <div className="">
          <h2 className="font-bold">Features</h2>
          <div className="overflow-auto h-[250px]">
            {filteredKeys.map((key, _) => (
              <div key={key} className="text-left">
                <Checkbox
                  checked={checkedItems[key]}
                  onChange={() => handleCheckboxChange(key)}
                  color="indigo"
                  inputProps={{ "aria-label": `${key}-checkbox` }}
                />
                <label htmlFor={`${key}-checkbox`} className="ml-2">
                  {key}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
