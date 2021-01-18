import * as tf from "@tensorflow/tfjs";

export function splitIntoColumns(tensor: tf.Tensor) {
  const tensorArr = tensor.split(tensor.shape[1] as number, 1);
  return tensorArr;
}

export function normalize(tensor: tf.Tensor<tf.Rank>) {
  const max = tensor.max(0);
  return tensor.div(max);
}

export function createRandomDiv() {
  const div = document.createElement("section");
  div.id = `div_${Math.random() * 10000}`;
  document.body.appendChild(div);
  return div;
}

export default function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
