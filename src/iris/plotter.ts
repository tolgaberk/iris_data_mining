import Plotly, { Data, Layout } from "plotly.js";
import { createRandomDiv } from "../helpers";
import { features, iris } from "./data";

export function drawBoxPlot() {
  const div = createRandomDiv();

  const tracesArr: Data[] = features.map((featureName) => ({
    y: iris.map((item) => item[featureName]),
    name: featureName,
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
    };
    const div = createRandomDiv();
    Plotly.newPlot(div, [trace], { title: `${trace.name} Histograms` });
  }
}
////////////////////////////////////////////////////
///////////////////////////////////////////////////
export function drawSplom() {
  const pl_colorscale = [
    [0.0, "#19d3f3"],
    [0.333, "#19d3f3"],
    [0.333, "#e763fa"],
    [0.666, "#e763fa"],
    [0.666, "#636efa"],
    [1, "#636efa"],
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
