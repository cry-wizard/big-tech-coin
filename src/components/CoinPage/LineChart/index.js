import React from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto"; // Don't remove this; needed for ChartJS setup

function LineChart({ chartData, multiAxis }) {
  const options = {
    plugins: {
      legend: {
        display: Boolean(multiAxis), // Ensuring a boolean value for ESLint compliance
      },
    },
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    scales: {
      crypto1: {
        position: "left",
      },
      ...(multiAxis
        ? {
            crypto2: {
              position: "right",
            },
          }
        : {}),
    },
  };

  return <Line data={chartData || { datasets: [] }} options={options} />;
}

export default LineChart;
