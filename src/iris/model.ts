import * as tf from "@tensorflow/tfjs";

// create a tensorflow sequential model
const model = tf.sequential();

// add 3 dense layers with 4 input nodes 9 hidden nodes in 1 hidden layer and 3 output nodes
model.add(
  tf.layers.dense({
    inputShape: [4],
    units: 4,
    activation: "sigmoid",
  })
);
model.add(
  tf.layers.dense({
    units: 9,
    activation: "relu",
  })
);
model.add(
  tf.layers.dense({
    units: 3,
    activation: "sigmoid",
  })
);
// i have tried every layer in relu but it gave
// suprisingly bad performance so i tried
// combinations and stick with this configuration
// of activation functions

// compile the model with meanSquaredError function as loss function
// adam algorithm as optimizer with a .05 learning rate
model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(0.05),
});

export { model };

// a helper function which acts like a kill switch for training session
// randomizes the weights for getting out of local minima
export function resetModel(model: tf.Sequential, callback: () => void) {
  model.stopTraining = true;
  const modelWeights = model.getWeights();
  const newModelWeights = modelWeights.map((item) =>
    tf.randomNormal(item.shape)
  );
  model.setWeights(newModelWeights);
  setTimeout(() => {
    callback();
  }, 2000);
}
