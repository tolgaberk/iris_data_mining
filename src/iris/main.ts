import { model, resetModel } from "./model";
import * as tf from "@tensorflow/tfjs";
import {
  testDataTensor,
  testOutputTensor,
  trainDataTensor,
  trainOutputTensor,
} from "./data";
import { Tensor } from "../typings";
import {
  drawAccuracy,
  drawBoxPlot,
  drawHistograms,
  drawLossGraph,
  drawSplom,
  drawStatistics,
} from "./plotter";
import { createRandomDiv } from "../helpers";
////////////////////////////////////////////////////
///////////////////////////////////////////////////

// run the tensorflow model to fit itself to train data
function evaluateModel() {
  tf.tidy(() => {
    model
      .fit(trainDataTensor, trainOutputTensor, {
        epochs: 100, // how many times its going to pass over data
        shuffle: true,
        callbacks: {
          onEpochEnd,
        },
      })
      .then(({ history }) => {
        drawLossGraph(history.loss as number[]);
        //
        predictAndReportAccuracy();
      });
  });
}

evaluateModel();
drawBoxPlot();
drawStatistics();
drawHistograms();
drawSplom();

//

const indicatorDiv = createRandomDiv();
indicatorDiv.style.textAlign = "center";
indicatorDiv.style.fontSize = "2rem";
//
function predictAndReportAccuracy() {
  // predict species based on trained data and calculated weights
  const predicted: Tensor = model.predict(testDataTensor) as Tensor;

  // get most confident specie index
  const softmaxedPrediction = predicted.argMax(1);
  // compare it to labels
  const accuracyTensor = softmaxedPrediction.equal(testOutputTensor.argMax(1));

  // get tensor from gpu
  const accuracyVector = accuracyTensor.arraySync() as number[];

  // count true and false values
  const counts = accuracyVector.reduce(
    (acc, item) => {
      item ? acc.truthies++ : acc.falsies++;
      return acc;
    },
    { truthies: 0, falsies: 0 }
  );

  // get accuracy by dividing true values by item count
  const accuracy = counts.truthies / accuracyVector.length;

  drawAccuracy(counts);

  indicatorDiv.innerHTML = `Accuracy = ${(accuracy * 100).toFixed(2)}%`;
}

//

let sameLossCounter = 0;
let lastLoss = 0;
// epoch callback  => i added a auto reset switch in case model stucks in a local minima for 30 epochs
function onEpochEnd(epoch: number, logs: tf.Logs | undefined): void {
  indicatorDiv.innerHTML = `Model ${epoch + 1}% finished!`;

  if (logs?.loss) {
    lastLoss === logs.loss && sameLossCounter++;
    lastLoss = logs.loss;
    if (sameLossCounter > 30) {
      console.log("Model Stuck in a local minima re-evaluating");
      resetModel(model, evaluateModel);
    }
  } else {
    sameLossCounter = 0;
  }
}
