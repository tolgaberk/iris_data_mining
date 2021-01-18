import Plotly, { Data, Layout } from "plotly.js";
import { calcStatistics, Statistics } from "../statistics";
import getRandomColor, { createRandomDiv } from "../helpers";
import { features, iris } from "./data";

export function drawBoxPlot() {
  const div = createRandomDiv();

  const tracesArr: Data[] = features.map((featureName) => ({
    y: iris.map((item) => item[featureName]),
    name: featureName,
    boxpoints: "all",
    type: "box",
  }));

  Plotly.newPlot(div, tracesArr, { title: "Feature Box Plots" });
}
/////////////////////////////////////////////////////
///////////////////////////////////////////////////
export function drawHistograms() {
  for (const featureName of features) {
    const trace: Data = {
      x: iris.map((item) => item[featureName]),
      name: featureName,
      type: "histogram",
      marker: { color: getRandomColor(), opacity: 1 },
    };
    const div = createRandomDiv();
    Plotly.newPlot(div, [trace], { title: `${trace.name} Histogram` });
  }
}
////////////////////////////////////////////////////
///////////////////////////////////////////////////
export function drawSplom() {
  const pl_colorscale = [
    [0.0, "#211B1E"],
    [0.333, "#46464A"],
    [0.333, "#DD9F2E"],
    [0.666, "#F79028"],
    [0.666, "#D55A2A"],
    [1, "#FF4800"],
  ];

  const axis = {
    showline: false,
    zeroline: false,
    gridcolor: "#ffff",
    ticklen: 4,
  };

  const colors = [];
  for (let i = 0; i < iris.length; i++) {
    if (iris[i].Species === "Iris-setosa") {
      colors.push(0);
    } else if (iris[i].Species == "Iris-versicolor") {
      colors.push(0.5);
    } else if (iris[i].Species == "Iris-virginica") {
      colors.push(1);
    }
  }

  const data = [
    {
      type: "splom",
      dimensions: features
        .map((feature) => ({
          label: feature,
          values: iris.map((item) => item[feature]),
        }))
        .slice(0, features.length - 1),
      text: iris.map((item) => item.Species),
      marker: {
        color: colors,
        colorscale: pl_colorscale,
        size: 7,
        line: {
          color: "white",
          width: 0.5,
        },
      },
    },
  ];

  const layout: Partial<Layout> = {
    title: "Iris ScatterPlot Matrix",
    height: 1000,
    width: 1500,
    autosize: false,
    hovermode: "closest",
    dragmode: "select",
    plot_bgcolor: "rgba(240,240,240, 0.95)",
    xaxis: axis,
    yaxis: axis,
    xaxis2: axis,
    xaxis3: axis,
    yaxis2: axis,
    yaxis3: axis,
  };

  const div = createRandomDiv();

  Plotly.newPlot(div, data as Data[], layout);
}

export function drawLossGraph(loss: number[]) {
  const div = createRandomDiv();
  Plotly.newPlot(
    div,
    [
      {
        type: "scatter",
        labels: ["iteration", "value"],
        marker: { color: getRandomColor(), opacity: 1 },

        x: loss.map((_, i) => i),
        y: loss,
      },
    ],
    {
      title: "Loss Value over Iterations",
      xaxis: { title: "Iteration Count" },
      yaxis: { title: "Loss Value" },
    }
  );
}

export function drawAccuracy(accuracy: { truthies: number; falsies: number }) {
  const div = createRandomDiv();
  Plotly.newPlot(div, [
    {
      type: "bar",
      marker: { color: getRandomColor(), opacity: 1 },
      x: ["Truthies", "Falsies"],
      y: [accuracy.truthies, accuracy.falsies],
    },
  ]);
}

export function drawStatistics() {
  const statistics: Partial<Statistics> = calcStatistics(iris);
  delete statistics.histograms;
  const featureNames = Object.keys(statistics.averages as any);
  const keys = Object.keys(statistics);

  for (const key of keys) {
    const averagePlot: Data = {
      x: featureNames,
      y: Object.values(statistics[key] as any) as number[],
      type: "bar",
      marker: { color: getRandomColor(), opacity: 1 },
    };
    const avrgDiv = createRandomDiv();
    if (key !== "minMax")
      Plotly.newPlot(avrgDiv, [averagePlot], { title: key });
  }

  const minMaxPlot: Data[] = featureNames.map((key) => ({
    x: ["min", "max"],
    y: statistics.minMax && statistics.minMax[key],
    type: "bar",
    name: key,
    marker: { color: getRandomColor(), opacity: 1 },
  }));
  const div = createRandomDiv();
  Plotly.newPlot(div, minMaxPlot, { title: "Min-Max", barmode: "group" });
}
