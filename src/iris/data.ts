import iris from "../data/iris/Iris.json";
import * as tf from "@tensorflow/tfjs";

export { iris };

export const features = [
  "SepalLengthCm",
  "SepalWidthCm",
  "PetalLengthCm",
  "PetalWidthCm",
  "Species",
];
export const species = ["Iris-virginica", "Iris-versicolor", "Iris-setosa"];

const trainTestRatio = 0.8;
const trainPartEndIndex = Math.round(iris.length * trainTestRatio);
const trainPart = iris.slice(0, trainPartEndIndex);
const testPart = iris.slice(trainPartEndIndex, iris.length);

export const allData = iris.map((item) => [
  item["SepalLengthCm"],
  item["SepalWidthCm"],
  item["PetalLengthCm"],
  item["PetalWidthCm"],
  ...species.map((specie) => (item["Species"] === specie ? 1 : 0)),
]);

export const allDataTensor = tf.tensor2d(allData);
export const trainData = trainPart.map((item) => [
  item["SepalLengthCm"],
  item["SepalWidthCm"],
  item["PetalLengthCm"],
  item["PetalWidthCm"],
]);

export const trainDataTensor = tf.tensor2d(trainData);

console.log("trainData =>");
trainDataTensor.print();

export const trainOutput = trainPart.map((item) =>
  species.map((specie) => (item["Species"] === specie ? 1 : 0))
);

export const trainOutputTensor = tf.tensor2d(trainOutput);

console.log("trainOutput =>");
trainOutputTensor.print();

export const testData = testPart.map((item) => [
  item["SepalLengthCm"],
  item["SepalWidthCm"],
  item["PetalLengthCm"],
  item["PetalWidthCm"],
]);

export const testDataTensor = tf.tensor2d(testData);

console.log("testData =>");
testDataTensor.print();

const testOutput = testPart.map((item) =>
  species.map((specie) => (item["Species"] === specie ? 1 : 0))
);

export const testOutputTensor = tf.tensor2d(testOutput);

console.log("testOutput =>");
testOutputTensor.print();
