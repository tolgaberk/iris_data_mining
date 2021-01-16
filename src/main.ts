import "./bootstrap";
import "./plots";
import { drawBoxPlot, drawHistograms, drawSplom } from "./plots";
(async () => {
  drawBoxPlot();
  drawHistograms();
  drawSplom();
})();
