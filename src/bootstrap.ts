import Abalones from "./data/abalones.json";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const dataSize = Abalones.length;
const playData = Abalones.slice(0, dataSize * 1);
// const testData = Abalones.slice(0, 5000);
// const trainData = Abalones.slice(5000, dataSize);

////////////////////////////////////////////////////
///////////////////////////////////////////////////

const data: number[][] = [];
export const heads: string[] = Object.keys(playData[0]).slice(1);

playData.map((abalone) =>
  data.push(Object.values(abalone).slice(1) as number[])
);

export const shape = [data.length, heads.length];
export const dataTensor = tf.tensor(data, shape);
export const TEST_DIV = document.getElementById("test") as HTMLElement;

setInterval(() => {
  console.log("num tensors =>", tf.memory().numTensors);
}, 3000);
