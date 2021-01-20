import * as tf from "@tensorflow/tfjs";

// normalizes a tensor by column by range 0-1
export function normalize(tensor: tf.Tensor<tf.Rank>) {
  const max = tensor.max(0);
  return tensor.div(max);
}

export function normalizeArray(array: number[]) {
  const max = Math.max(...array);
  for (let i = 0; i < array.length; i++) {
    array[i] /= max;
  }
  return array;
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
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Fisher-Yates shuffle algorithm
export function shuffle(array: any[]) {
  let m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
