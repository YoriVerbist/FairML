import { useState, useEffect } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import modelService from "../../services/imporances";
import Tooltip from "../Tooltip";

export default function VariableOverview({ patients, updateCount, user }) {
  const [importances, setImportances] = useState(null);
  const [features, setFeatures] = useState(null);

  if (user.id === "") {
    user = {
      id: window.localStorage.getItem("userid"),
      group: "all",
      language: "en",
    };
  }

  useEffect(() => {
    console.log("Fetching importances...");
    modelService.getAll(user).then((data) => {
      setImportances(data.importances.map(([a, _]) => a.toFixed(3)));
      setFeatures(data.features);
    });
  }, [patients, updateCount]);

  if (!importances) {
    return (
      <>
        <Card className="flex flex-col w-[900px] max-h-[300px] border-2 border-blue-gray-100 h-screen">
          <div>
            <Tooltip
              title="Data Overview"
              content="Here you can see the how important each feature is when predicting if a specific patient will develop a new tumor. The higher the value, the more important the feature is."
              content2={
                "NOTE: It might take a couple of seconds for this graph to update when changes are applied."
              }
            />
            <Typography variant="h4" color="gray" className="mt-4 uppercase">
              Data Overview
            </Typography>
          </div>
          <CardBody className="px-0"></CardBody>
          <div className="border-2 w-[400px] m-auto rounded">
            <p>Loading feature importances...</p>
          </div>
        </Card>
      </>
    );
  }

  const dictionary = features.reduce((acc, key, index) => {
    acc[key] = importances[index];
    return acc;
  }, {});

  const sortedDictionary = Object.fromEntries(
    Object.entries(dictionary)
      .sort(([, a], [, b]) => b - a)
      .map(([key, value]) => [key, (value * 100).toFixed(1) + "%"]),
  );

  const chartConfig = {
    type: "bar",
    height: 290,
    width: 750,
    series: [
      {
        name: "Importance",
        data: Object.values(sortedDictionary),
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "Feature importances",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "80%",
          borderRadius: 2,
          hideZeroBarsWhenGrouped: true,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          rotate: -45,
          style: {
            colors: "#616161",
            fontSize: "10px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: Object.keys(sortedDictionary),
        title: {
          text: "Features",
        },
      },
      yaxis: {
        min: 0,
        max: sortedDictionary[Object.keys(sortedDictionary)[-1]],
        forceNiceScale: true,
        labels: {
          style: {
            colors: "#616161",
            fontSize: "10px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        title: {
          text: "Importance (%)",
        },
      },
      grid: {
        show: false,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 0,
          right: 40,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  return (
    <>
      <Card className="flex flex-col w-[900px] max-h-[400px] border-2 border-blue-gray-100  h-screen">
        <div>
          <Tooltip
            title="Data Overview"
            content="Here you can see the how important each feature is when predicting if a specific patient will develop a new tumor. The higher the value, the more important the feature is."
            content2={
              "NOTE: It might take a couple of seconds for this graph to update when changes are applied."
            }
          />
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            Data Overview
          </Typography>
        </div>
        <CardBody className="px-0 flex flex-col space-y-4">
          <div className="w-[750px] h-[300px] m-auto rounded">
            <Chart {...chartConfig} className="pb-32" />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
