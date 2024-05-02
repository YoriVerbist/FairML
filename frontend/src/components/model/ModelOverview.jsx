import { useState, useEffect } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import modelService from "../../services/imporances";
import Tooltip from "../Tooltip";

export default function ModelOverview({
  patients,
  patient,
  updateCount,
  user,
}) {
  const [accuracy, setAccuracy] = useState(1);

  if (user.id === "") {
    user = {
      id: window.localStorage.getItem("userid"),
      group: "all",
      language: "en",
    };
  }

  useEffect(() => {
    console.log("Fetching model data...");
    modelService.getModel(user).then((data) => {
      setAccuracy(data.accuracy);
    });
  }, [patient, updateCount, patients, user]);

  const chartConfig = {
    type: "donut",
    width: 200,
    height: 180,
    series: [
      parseFloat(accuracy.toFixed(3)),
      parseFloat((1 - accuracy).toFixed(3)),
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "Model accuracy",
      },
      dataLabels: {
        enabled: true,
      },
      colors: ["#23B90B", "#F63C3C"],
      legend: {
        show: false,
      },
      labels: ["Accuracy", "Not Accurate"],
    },
  };

  const KEYS = [
    "Gender",
    "Age",
    "Smoking",
    "History Smoking",
    "History Radiotherapy",
    "Thyroid Function",
    "Physical Examination",
    "Adenopathy",
    "Pathology",
    "Focality",
    "Risk",
    "Size Of Original Tumor",
    "Nearby Lymph Nodes",
    "Distant Metastasis",
    "Stage",
    "Response",
  ];

  return (
    <>
      <Card className="flex flex-col w-[900px] max-h-[300px] border-2 border-blue-gray-100  h-screen">
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
          <div className="flex flex-row">
            <Chart {...chartConfig} />
            <div className="mx-4">
              <Typography variant="h6" color="gray" className="mt-4 uppercase">
                Items in dataset
              </Typography>
              <p>{patients.length}</p>
              <Typography variant="h6" color="gray" className="mt-4 uppercase">
                Number of features
              </Typography>
              <p>{KEYS.length}</p>
            </div>
            <div className="text-left">
              <Typography variant="h6" color="gray" className="mt-4 uppercase">
                Features
              </Typography>
              <ul>
                {KEYS.slice(0, 5).map((val) => (
                  <li className="text-gray-500">- {val}</li>
                ))}
              </ul>
            </div>
            <div className="text-left mt-4 mx-4">
              <ul>
                {KEYS.slice(5, 11).map((val) => (
                  <li className="text-gray-500">- {val}</li>
                ))}
              </ul>
            </div>
            <div className="text-left mt-4 mx-4">
              <ul>
                {KEYS.slice(11, 18).map((val) => (
                  <li className="text-gray-500">- {val}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
}
