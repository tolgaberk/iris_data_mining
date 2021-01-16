import { TypedArray } from "@tensorflow/tfjs";
import Plotly, { Data, Layout } from "plotly.js";
import { dataTensor, heads } from "./bootstrap";
import getRandomColor, {
  splitIntoColumns,
  normalizeColumn,
  createRandomDiv,
} from "./helpers";
import { Tensor } from "./typings";

export function drawBoxPlot() {
  const div = createRandomDiv();
  //
  ////////////////////////////////////////////////////
  const getNormalizedColumnData = (tensor: Tensor, index: number) => {
    const tensorData = normalizeColumn(tensor).dataSync();
    return {
      tensorData,
      label: heads[index],
    };
  };
  const generatePlotlyDataForBox = (data: {
    tensorData: TypedArray;
    label: string;
  }) => {
    return {
      type: "box",
      boxpoints: "all",
      // x: heads,
      name: data.label,
      y: (data.tensorData as unknown) as number[],
    } as Data;
  };
  ///////////////////////////////////////////////////

  const tensorArr = splitIntoColumns(dataTensor);

  const tensorDataArr = tensorArr.map(getNormalizedColumnData);
  const tracesArr = tensorDataArr.map(generatePlotlyDataForBox);

  Plotly.newPlot(div, tracesArr, { title: "normalized box plots" });
}

export function drawHistograms() {
  const columnsArr = splitIntoColumns(dataTensor);

  const datas = columnsArr.map(
    (item, index): Data => ({
      x: item.dataSync(),
      name: heads[index],
      type: "histogram",
      marker: { color: getRandomColor() },
    })
  );
  console.log(datas);
  datas.map((data) => {
    const div = createRandomDiv(true);
    Plotly.newPlot(div, [data], { title: data.name });
  });
}

export function drawSplom() {
  const columnTensorsArr = splitIntoColumns(dataTensor);
  const pl_colorscale: [number, string][] = [
    [0.0, "#0096ff"],
    [0.33, "#119dff"],
    [0.66, "#ef553b"],
    [1, "#ef553b"],
  ];
  const axis = () => ({
    showline: true,
    zeroline: false,
    gridcolor: "#ffff",
    ticklen: 2,
    tickfont: { size: 10 },
    titlefont: { size: 12 },
  });

  var data: Data[] = [
    {
      type: "splom",
      //@ts-ignore
      dimensions: columnTensorsArr.map((item, index) => ({
        values: (item.dataSync() as unknown) as number[],
        label: heads[index],
      })),
      text: heads,
      marker: {
        color: (columnTensorsArr[8].dataSync() as unknown) as number[],
        colorscale: pl_colorscale,
        size: 5,
        line: {
          color: "white",
          width: 0.5,
        },
      },
    },
  ];

  let layout: Partial<Layout> = {
    title: "Scatterplot Matrix (SPLOM) for Abalones",
    height: 1000,
    width: 1500,
    autosize: false,
    hovermode: "closest",
    dragmode: "select",
    plot_bgcolor: "rgba(240,240,240, 0.95)",
    xaxis: axis(),
    yaxis: axis(),
    xaxis2: axis(),
    xaxis3: axis(),
    xaxis4: axis(),
    xaxis5: axis(),
    xaxis6: axis(),
    xaxis7: axis(),
    xaxis8: axis(),
    yaxis2: axis(),
    yaxis3: axis(),
    yaxis4: axis(),
    yaxis5: axis(),
    yaxis6: axis(),
    yaxis7: axis(),
    yaxis8: axis(),
  };
  const div = createRandomDiv();

  Plotly.newPlot(div, data, layout);
}
