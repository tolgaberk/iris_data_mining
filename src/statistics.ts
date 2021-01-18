type Statistics = {
  averages: Record<string, number>;
  sums: Record<string, number>;
  minMax: Record<string, [number, number]>;
  histograms: Record<string, Record<string, number>>;
};

export function calcStatistics<T extends number | string>(playData: Array<T>) {
  const statistics: Statistics = {
    averages: {},
    sums: {},
    minMax: {},
    histograms: {},
  };

  const { minMax, sums, histograms } = statistics;

  const keys = Object.keys(playData[0]);
  //
  for (const datum of playData) {
    for (const featureName of keys) {
      if (typeof datum[featureName] === "number") {
        if (sums[featureName]) sums[featureName] += datum[featureName];
        else sums[featureName] = datum[featureName];
        //
        if (minMax[featureName])
          minMax[featureName] = [
            Math.min(minMax[featureName][0], datum[featureName]),
            Math.max(minMax[featureName][1], datum[featureName]),
          ];
        else minMax[featureName] = [datum[featureName], datum[featureName]];
      }

      let value;
      if (typeof datum[featureName] === "number") {
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

  statistics.averages = { ...sums };

  for (const key in minMax) {
    statistics.averages[key] /= playData.length;
  }

  console.log(statistics);
  return statistics;
}
