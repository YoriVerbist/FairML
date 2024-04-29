import { useState, useEffect } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import modelService from "../../services/imporances";
import Tooltip from "../Tooltip";

export default function ModelOverview({ patient, updateCount, user }) {
  const [accuracy, setAccuracy] = useState(null);

  if (user.id === "") {
    user = {
      id: window.localStorage.getItem("userid"),
      group: "all",
      language: "en",
    };
  }

  useEffect(() => {
    console.log("Fetching importances...");
    modelService.getModel(user).then((data) => {
      console.log(data);
      setAccuracy(data.accuracy);
    });
  }, [patient, updateCount]);

  const chartConfig = {
    type: "donut",
    width: 200,
    height: 180,
    series: [accuracy, 1 - accuracy],
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
      labels: ["Accuracy", "No Recurrence"],
    },
  };

  return (
    <>
      <Card className="flex flex-col w-[900px] max-h-[270px] border-2 border-blue-gray-100  h-screen">
        <div>
          <Tooltip
            title="Overall Model Accuracy"
            content="Here you can see the how important each feature is when predicting if a specific patient will develop a new tumor. The higher the value, the more important the feature is."
          />
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            Overall Model Accuracy
          </Typography>
        </div>
        <CardBody className="px-0 flex flex-col space-y-4 items-center">
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    </>
  );
}
