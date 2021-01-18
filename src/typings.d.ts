import * as tf from "@tensorflow/tfjs";
import Abalones from "./data/abalones.json";
type Tensor = tf.Tensor;
type Rank = tf.Rank;
type Abalones = typeof Abalones;

type Abalone = {
  sex: string;
  length: number;
  diameter: number;
  height: number;
  whole_weight: number;
  shucked_weight: number;
  viscera_weight: number;
  shell_weight: number;
  rings: number;
};
