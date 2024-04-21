import { Button } from "@material-tailwind/react";
import patientService from "../../services/patients";

export default function AdjustVariable({ patients, changes }) {
  // const handleClick = async (changes) = {
  //     const changedFeatures = await patientService.changeFeatures(changes)
  //     console.log(changedFeatures)
  // }
  return (
    <>
      <div className="">
        <Button variant="filled" size="lg" color="red" fullWidth>
          Apply Changes
        </Button>
      </div>
    </>
  );
}
