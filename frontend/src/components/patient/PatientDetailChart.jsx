import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Typography } from "@material-tailwind/react";

import predictService from "../../services/patients";

export default function PatientDefaultChart({ patient }) {
  const [previousPatient, setPreviousPatient] = useState(patient);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    if (patient !== previousPatient) {
      console.log("Predicting patient...");
      predictService.predictPatient(patient.id).then((data) => {
        setPrediction(data);
      });
    }
  }, [patient, previousPatient]);

  if (!prediction) return false;

  console.log(prediction);

  const pred = prediction.probabilities[0][0];
  console.log(pred);

  const chartConfig = {
    type: "pie",
    width: 200,
    height: 200,
    series: [pred, 1 - pred],
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
      colors: ["#23B90B", "#F63C3C"],
      legend: {
        show: false,
      },
    },
  };

  return (
    <>
      <div>
        <Typography variant="p" color="gray" className="mt-4">
          Recurrence rate
        </Typography>
      </div>
      <Chart {...chartConfig} />
    </>
  );
}
