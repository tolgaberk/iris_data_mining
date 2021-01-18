import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { testData, trainData } from "./constants";
import { Abalone, Rank } from "../typings";

////////////////////////////////////////////////////
///////////////////////////////////////////////////

// train/fit our network
console.time("Training");
console.log("Training");

const trainingData = tf.tensor2d(
  trainData.map((item: Abalone) => [
    item["length"],
    item["diameter"],
    item["height"],
    item["whole_weight"],
    item["shucked_weight"],
    item["viscera_weight"],
    item["shell_weight"],
    item["rings"],
  ])
);
const outputData = tf.tensor2d(
  trainData.map((item) => [
    item.sex === "M" ? 1 : 0,
    item.sex === "F" ? 1 : 0,
    item.sex === "I" ? 1 : 0,
  ])
);

const testingData = tf.tensor2d(
  testData.map((item) => [
    item["length"],
    item["diameter"],
    item["height"],
    item["whole_weight"],
    item["shucked_weight"],
    item["viscera_weight"],
    item["shell_weight"],
    item["rings"],
  ])
);

// const testingOutputData = tf.tensor2d(
//   testData.map((item) => [
//     item.sex === "M" ? 1 : 0,
//     item.sex === "F" ? 1 : 0,
//     item.sex === "I" ? 1 : 0,
//   ])
// );

const model = tf.sequential();

model.add(
  tf.layers.dense({
    inputShape: [8],
    activation: "relu",
    units: 8,
  })
);

model.add(
  tf.layers.dense({
    inputShape: [8],
    activation: "relu",
    units: 3,
  })
);

model.add(
  tf.layers.dense({
    activation: "relu",
    units: 3,
  })
);

model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(0.06),
});
//

const trainMax = trainingData.max(0);
const testMax = testingData.max(0);

const normalizedTrainingData = trainingData.div(trainMax);
const normalizedtestingData = trainingData.div(testMax);

model
  .fit(normalizedTrainingData, outputData, {
    epochs: 50,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.timeEnd(`iteration => ${epoch}`);
        console.log(logs);
      },
      onEpochBegin: (epoch, logs) => {
        console.time(`iteration => ${epoch}`);
      },
    },
  })
  .then((history) => {
    console.log(history);

    const predicted = model.predict(normalizedtestingData) as tf.Tensor<Rank>;
    console.log(predicted.arraySync());
    console.timeEnd("Training");
  });

//
