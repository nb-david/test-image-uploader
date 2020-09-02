const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/indexProd.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    libraryTarget: "commonjs",
  },
  plugins: [new CleanWebpackPlugin()],
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
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // in bytes
            },
          },
        ],
      },
    ],
  },
  target: "node",
  resolve: {
    // Enable webpack find ts and tsx files without an extension
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
};
