import { model } from "./model";
import * as tf from "@tensorflow/tfjs";
import {
  testDataTensor,
  testOutputTensor,
  trainDataTensor,
  trainOutputTensor,
} from "./data";
import { Tensor } from "../typings";
import { drawBoxPlot, drawHistograms, drawSplom } from "./plotter";
import { Scalar } from "@tensorflow/tfjs";

tf.tidy(() => {
  model
    .fit(trainDataTensor, trainOutputTensor, { epochs: 100, shuffle: true })
    .then((history) => {
      console.log("model.fit => history", history);
      //
      const evaluated = model.evaluate(testDataTensor, testOutputTensor);
      const predicted = model.predict(testDataTensor);
      console.log((predicted as Tensor).arraySync());

      model.summary();

      console.log((evaluated as Scalar).arraySync());
    });
});

drawBoxPlot();
drawHistograms();
drawSplom();
