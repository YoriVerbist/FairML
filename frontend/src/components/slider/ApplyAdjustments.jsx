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
      <div className="h-60"></div>
      <div className="bottom-0">
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
