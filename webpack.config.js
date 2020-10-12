const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./frontend/lake-hopper.jsx",
  output: {
    path: path.resolve(__dirname, "app", "assets", "javascripts"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          query: {
            presets: [
              "@babel/react",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  targets: "defaults",
                },
              ],
            ],
          },
        },
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
};
