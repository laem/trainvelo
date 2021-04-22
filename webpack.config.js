const path = require("path");
const webpack = require("webpack");

console.log(SNCF_TOKEN);
module.exports = {
  entry: "./iframe/index.js",
  output: {
    filename: "iframe.js",
    path: path.resolve(__dirname, "build"),
  },
  plugins: [
    new webpack.DefinePlugin({
      SNCF_TOKEN: JSON.stringify(process.env.SNCF_TOKEN),
    }),
  ],
};
