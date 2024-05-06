import Chart from "react-apexcharts";

export default function VariableBias({ patients, selectedValue }) {
  const occurrenceCount = {};

  // Loop through the payload data
  patients.forEach((patient) => {
    // Get the value of the Focality key from the current patient object
    const value = patient[selectedValue];

    // Increment the occurrence count for the value
    occurrenceCount[value] = (occurrenceCount[value] || 0) + 1;
  });

  const uniqueValues = Object.keys(occurrenceCount);
  console.log("count", occurrenceCount);

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
        <p>Iets</p>
      </div>
    </>
  );
}
