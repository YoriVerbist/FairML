import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Typography } from "@material-tailwind/react";

import predictService from "../../services/patients";

export default function PatientDefaultChart({ patient, user }) {
  // const [previousPatient, setPreviousPatient] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    console.log("Predicting patient...");
    predictService.predictPatient(patient.id, user).then((data) => {
      setPrediction(data);
    });
  }, [patient]);

  if (!prediction) return false;

  const pred = parseFloat(prediction.probabilities[0][0].toFixed(4));
  const negPred = parseFloat(prediction.probabilities[0][1].toFixed(4));

  const chartConfig = {
    type: "pie",
    width: 200,
    height: 180,
    series: [negPred, pred],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#F63C3C", "#23B90B"],
      legend: {
        show: false,
      },
      labels: ["Recurrence", "No Recurrence"],
    },
  };

  return (
    <>
      <div className="mb-2">
        <Typography variant="h6" color="gray" className="mt-4">
          Recurrence rate
        </Typography>
        <Chart {...chartConfig} />
      </div>
    </>
  );
}
