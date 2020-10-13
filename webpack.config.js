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
            plugins: ["@babel/plugin-proposal-export-default-from"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: { localIdentName: "[name]_[local]-[hash:base64:3]" },
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", "*"],
  },
};
