import { useState, useEffect } from "react";
import { Card, Typography, CardBody } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import modelService from "../../services/imporances";

export default function VariableOverview({ patients, updateCount, user }) {
  const [importances, setImportances] = useState(null);
  const [features, setFeatures] = useState(null);

  const excludeKeys = ["_id", "id", "Recurred"];
  const filteredKeys = Object.keys(patients[0]).filter(
    (key) => !excludeKeys.includes(key),
  );

  useEffect(() => {
    console.log("Fetching importances...");
    modelService.getAll(user).then((data) => {
      console.log("data", data);
      const features = [];
      const importances = [];
      if (data && data.features && data.importances) {
        const featuresDict = data.features;
        const importancesList = data.importances[0]; // Assuming only one list of importances

        Object.entries(featuresDict).forEach(([feature, value], index) => {
          // Check if the feature is marked as true
          if (value === true) {
            features.push(feature);

            // Get the corresponding importance from the importances list if available
            const importancePair = importancesList[index];
            // If importancePair is defined, use the first value of the pair
            const importance = importancePair
              ? importancePair[0].toFixed(3)
              : 0; // Use 0 if importancePair is undefined
            importances.push(importance);
          } else {
            importances.push(0);
          }
        });
      }
      console.log("importances", importances);
      console.log("features", features);
      setImportances(importances);
      setFeatures(features);
    });
  }, [patients, updateCount]);

  if (!importances) {
    return (
      <>
        <Card className="flex flex-col w-[900px] max-h-[300px] border-2 border-blue-gray-100 items-center h-screen">
          <div>
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
    Object.entries(dictionary).sort(([, a], [, b]) => b - a),
  );

  console.log("sortedDictionary", sortedDictionary);
  console.log(Object.keys(sortedDictionary));

  const chartConfig = {
    type: "bar",
    height: 290,
    width: 550,
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
          text: "Importance",
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
      <Card className="flex flex-col w-[900px] max-h-[400px] border-2 border-blue-gray-100 items-center h-screen">
        <div>
          <Typography variant="h4" color="gray" className="mt-4 uppercase">
            Data Overview
          </Typography>
        </div>
        <CardBody className="px-0 flex flex-col space-y-4">
          <div className="border-2 w-[550px] h-[300px] m-auto rounded">
            <Chart {...chartConfig} className="pb-32" />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
