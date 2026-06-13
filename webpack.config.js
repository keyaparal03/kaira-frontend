const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)$/,

        exclude: /node_modules/,

        use: "babel-loader"
      },

      {
        test: /\.scss$/,

        use: [
          "style-loader",

          {
            loader: "css-loader",

            options: {
              modules: {
                auto: true
              }
            }
          },

          "sass-loader"
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],

  devServer: {
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true
  }
};