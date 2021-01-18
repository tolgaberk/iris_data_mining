import * as tf from "@tensorflow/tfjs";

const model = tf.sequential();

model.add(tf.layers.dense({ inputShape: [4], units: 4, activation: "relu6" }));
model.add(tf.layers.dense({ inputShape: [4], units: 4, activation: "relu6" }));
model.add(tf.layers.dense({ inputShape: [4], units: 4, activation: "relu6" }));
model.add(tf.layers.dense({ inputShape: [4], units: 3, activation: "relu6" }));
model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.sgd(0.01),
});
export { model };
