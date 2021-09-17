const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "build"), // Even being served in memory, it requires a folder path
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    stats: "minimal", // Reduces a lot of information on the console
    overlay: true, // Overlay any errors that occurs in the browser
    historyApiFallback: true, // All request will be sent to index.html

    // Below is just a fix for previous chrome version troubles. It might be not necessary anymore nowadays
    // disableHostCheck: true,
    // headers: { "Access-Control-Allow-Origin:": "*" },
    // https: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      favicon: "src/favicon.ico",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
