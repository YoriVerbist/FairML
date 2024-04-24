import { Button } from "@material-tailwind/react";
import patientService from "../../services/patients";

export default function AdjustVariable({
  patients,
  changes,
  setUpdateCount,
  user,
}) {
  const handleClick = async (changes) => {
    setUpdateCount((count) => count + 1);
    const changedFeatures = await patientService.changeFeatures(changes, user);
  };

  return (
    <>
      <div className="w-[800px]">
        <Button
          variant="filled"
          size="lg"
          color="red"
          fullWidth
          onClick={() => handleClick(changes)}
        >
          Apply Changes
        </Button>
      </div>
    </>
  );
}
