export type Statistics = {
  averages: Record<string, number>;
  sums: Record<string, number>;
  minMax: Record<string, [number, number]>;
  histograms: Record<string, Record<string, number>>;
  standartDeviations: Record<string, number>;
};

// calculates sums,averages,minMax values ,standart deviations and histogram values for numeric data
export function calcStatistics<T extends number | string>(data: Array<T>) {
  const statistics: Statistics = {
    averages: {},
    sums: {},
    minMax: {},
    histograms: {},
    standartDeviations: {},
  };

  const { minMax, sums, histograms, standartDeviations: stds } = statistics;

  // grap column names
  const keys = Object.keys(data[0]);

  // for every data loop for every key
  for (const datum of data) {
    for (const featureName of keys) {
      if (typeof datum[featureName] === "number") {
        //check for undefined and add features values in sum property
        if (sums[featureName]) sums[featureName] += datum[featureName];
        else sums[featureName] = datum[featureName];
        //

        //check for undefined and get minimum and maximum values from feature values by comparing them to old ones
        if (minMax[featureName])
          minMax[featureName] = [
            Math.min(minMax[featureName][0], datum[featureName]),
            Math.max(minMax[featureName][1], datum[featureName]),
          ];
        else minMax[featureName] = [datum[featureName], datum[featureName]];
      }

      //count every value in every feature and construct a histogram for that feature
      if (featureName !== "Id") {
        let value;
        if (typeof datum[featureName] === "number") {
          // if value is number then get only 2 digits to be little
          // less specific otherwise histogram domain gets huge
          // and we cant get any idea from data
          value = datum[featureName].toFixed(2);
        } else {
          value = datum[featureName];
          datum[featureName];
        }

        if (histograms[featureName] && histograms[featureName][value]) {
          histograms[featureName][value] = histograms[featureName][value] + 1;
        } else {
          !histograms[featureName] && (histograms[featureName] = {});
          histograms[featureName][value] = 1;
        }
      }
    }
  }

  statistics.averages = { ...sums };

  // calc averages by dividing sums
  for (const key in sums) {
    statistics.averages[key] /= data.length;
  }

  //Math.sqrt(Σ (x - xMean)^2 / N)
  // calc standart deviations by using already calculated averages
  for (const datum of data) {
    for (const featureName of keys) {
      if (typeof datum[featureName] === "number") {
        if (stds[featureName])
          stds[featureName] +=
            (datum[featureName] - statistics.averages[featureName]) ** 2;
        else
          stds[featureName] =
            (datum[featureName] - statistics.averages[featureName]) ** 2;
      }
    }
  }
  for (const key in stds) {
    stds[key] = Math.sqrt(stds[key] / data.length);
  }

  return statistics;
}
