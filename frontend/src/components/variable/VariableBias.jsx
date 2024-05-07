import Chart from "react-apexcharts";

export default function VariableBias({ patients, selectedValue }) {
  const occurrenceCount = {};
  if (selectedValue === "Age") {
    patients.forEach((patient) => {
      const value = patient[selectedValue];
      if (value < 20) {
        occurrenceCount["10-19"] = (occurrenceCount["10-19"] || 0) + 1;
      } else if (value < 30 && value > 19) {
        occurrenceCount["20-29"] = (occurrenceCount["20-29"] || 0) + 1;
      } else if (value < 40 && value > 29) {
        occurrenceCount["30-39"] = (occurrenceCount["30-39"] || 0) + 1;
      } else if (value < 50 && value > 39) {
        occurrenceCount["40-49"] = (occurrenceCount["40-49"] || 0) + 1;
      } else if (value < 60 && value > 49) {
        occurrenceCount["50-59"] = (occurrenceCount["50-59"] || 0) + 1;
      } else if (value < 70 && value > 59) {
        occurrenceCount["60-69"] = (occurrenceCount["60-69"] || 0) + 1;
      } else if (value < 80 && value > 69) {
        occurrenceCount["70-79"] = (occurrenceCount["70-79"] || 0) + 1;
      } else if (value < 90 && value > 79) {
        occurrenceCount["80-89"] = (occurrenceCount["80-89"] || 0) + 1;
      }
    });
  } else {
    // Loop through the payload data
    patients.forEach((patient) => {
      // Get the value of the Focality key from the current patient object
      const value = patient[selectedValue];

      // Increment the occurrence count for the value
      occurrenceCount[value] = (occurrenceCount[value] || 0) + 1;
    });
  }

  const uniqueValues = Object.keys(occurrenceCount);

  const representationBias = {};
  uniqueValues.forEach((value) => {
    representationBias[value] = (
      (occurrenceCount[value] / Math.max(...Object.values(occurrenceCount))) *
      100
    ).toFixed(1);
  });

  const biases = Object.fromEntries(
    Object.entries(representationBias).sort(([, a], [, b]) => b - a),
  );

  const possibleIssue = Object.fromEntries(
    Object.entries(biases).filter(([, val]) => val < 25),
  );

  const chartConfig = {
    type: "bar",
    height: 300,
    series: [
      {
        name: "bias (%)",
        data: [...Object.values(biases)],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "Represenation Bias",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        title: {
          text: "Features",
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [...Object.keys(biases)],
      },
      yaxis: {
        title: {
          text: "Bias (%)",
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
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
          top: 5,
          right: 20,
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
      <div className="w-96 m-auto rounded">
        {selectedValue ? (
          <Chart {...chartConfig} />
        ) : (
          <p className="text-center font-bold">
            Select a variable to view its bias
          </p>
        )}
        {Object.keys(possibleIssue).length === 0 ? (
          <p>No bias issues found</p>
        ) : (
          <div>
            <p>There might be a bias issue for the variables:</p>
            <p className="text-red-600 font-bold">
              {...Object.keys(possibleIssue).join(" - ")}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
