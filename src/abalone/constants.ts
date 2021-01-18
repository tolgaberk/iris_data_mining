import Abalones from "../data/abalone/abalones.json";
import * as tf from "@tensorflow/tfjs";
export const DATA_SIZE = Abalones.length;
export const DATA_PERCENT = 0.1;
export const CURRENT_DATA_SIZE = Math.round(DATA_SIZE * DATA_PERCENT);
export const trainData = Abalones.slice(0, CURRENT_DATA_SIZE);
export const testData = Abalones.slice(CURRENT_DATA_SIZE, Abalones.length);

export const features = [
  "sex",
  "length",
  "diameter",
  "height",
  "whole_weight",
  "shucked_weight",
  "viscera_weight",
  "shell_weight",
  "rings",
];

const data: number[][] = [];

trainData.map((abalone) =>
  data.push(Object.values(abalone).slice(1) as number[])
);

export const shape = [data.length, features.length];
export const dataTensor = tf.tensor2d(data);
