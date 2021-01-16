const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.ts",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: [
          "ify-loader",
          "transform-loader?plotly.js/tasks/compress_attributes.js",
        ],
      },
    ],
  },
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      assert: require.resolve("assert"),
      buffer: require.resolve("buffer"),
      process: require.resolve("process/browser"),
      util: require.resolve("util/"),
      fs: false,
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.NODE_DEBUG": JSON.stringify(process.env.NODE_DEBUG),
      "process.type": JSON.stringify(process.type),
      "process.version": JSON.stringify(process.version),
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
};
