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

  const uniqueValues = Object.keys(occurrenceCount).sort();

  // Sort the occurrenceCount object based on the keys (unique values)
  const sortedOccurrenceCount = {};
  uniqueValues.forEach((value) => {
    sortedOccurrenceCount[value] = occurrenceCount[value];
  });

  const chartConfig = {
    type: "bar",
    height: 300,
    series: [
      {
        name: "Occurrences",
        data: [...Object.values(sortedOccurrenceCount)],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "Variable Counts",
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
        categories: uniqueValues,
      },
      yaxis: {
        title: {
          text: "Count",
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
      <div className="border-2 w-96 m-auto rounded">
        {selectedValue ? (
          <Chart {...chartConfig} />
        ) : (
          <p className="text-center">Select a variable to view its bias</p>
        )}
      </div>
    </>
  );
}
