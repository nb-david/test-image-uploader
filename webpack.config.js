const path = require("path");
module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(ts)x?$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader',"css-loader"],
      },
    ],
  },
  resolve: {
    // Enable webpack find ts and tsx files without an extension
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    port: 9000,
  },
};
