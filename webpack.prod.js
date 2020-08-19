const path = require("path");

module.exports = {
  entry: "./src/indexProd.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    libraryTarget: 'commonjs'
  },
  externals: ["react", "react-dom", "cropperjs", "antd"],
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
        exclude: /(node_modules|dist|build)/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  target: 'node',
  resolve: {
    // Enable webpack find ts and tsx files without an extension
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
