import { Button } from "@material-tailwind/react";
import patientService from "../../services/patients";

export default function AdjustVariable({
  patients,
  changes,
  setUpdateCount,
  user,
}) {
  const handleClick = async (changes) => {
    console.log(changes);
    setUpdateCount((count) => count + 1);
    const changedFeatures = await patientService.changeFeatures(changes, user);
    console.log(changedFeatures);
  };

  return (
    <>
      <div className="">
        <Button
          className="top-60"
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
