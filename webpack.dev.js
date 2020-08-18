const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "index_bundle.js",
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
        exclude: /(node_modules|build|dist)/,
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
  resolve: {
    // Enable webpack find ts and tsx files without an extension
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: `
    <html>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `,
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    port: 9000,
  },
};
