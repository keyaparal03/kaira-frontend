const path = require("path");

const HtmlWebpackPlugin =
  require(
    "html-webpack-plugin"
  );

module.exports = {
  mode: "development",


  entry:
    "./src/main.tsx",


  output: {
    path: path.resolve(
      __dirname,
      "dist"
    ),

    filename:
      "bundle.js",

    clean: true
  },


  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js"
    ]
  },

  module: {
    rules: [

      {
        test:
          /\.(ts|tsx|js)$/,

        exclude:
          /node_modules/,

        use: {
          loader:
            "babel-loader"
        }
      },

      {
        test: /\.css$/,

        use: [
          "style-loader",
          "css-loader"
        ]
      },

      {
        test:
          /\.module\.scss$/,

        use: [
          "style-loader",

          {
            loader:
              "css-loader",

            options: {
              modules:
                true
            }
          },

          "sass-loader"
        ]
      },

      {
        test: /\.scss$/,

        exclude:
          /\.module\.scss$/,

        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      
      {
        test:
          /\.(png|jpg|jpeg|svg|webp)$/,

        type:
          "asset/resource"
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template:
        "./public/index.html"
    })
  ],

  devServer: {
    port: 3000,

    hot: true,

    open: true,

    historyApiFallback:
      true,

    static: {
      directory:
        path.join(
          __dirname,
          "public"
        )
    }
  }
};