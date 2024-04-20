import { useState, useEffect } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import modelService from "../../services/imporances";
import Sliders from "./Sliders";

export default function AdjustSlider({ patients }) {
  return (
    <>
      <Card className="flex flex-col w-[900px] max-h-[400px] border-2 border-blue-gray-100 items-center h-screen">
        <div>
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            Adjust Feature Importance
          </Typography>
        </div>
        <CardBody className="px-0 flex flex-col space-y-4">
          <div className="flex flex-row space-x-2">
            <div className="border-2 w-[370px] h-[300px] m-auto rounded">
              <Sliders />
            </div>
            <div className="border-2 w-[370px] h-[300px] m-auto rounded">
              something
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
