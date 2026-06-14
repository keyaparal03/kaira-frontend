const path = require("path");

const HtmlWebpackPlugin =
  require(
    "html-webpack-plugin"
  );

module.exports = {
  mode: "development",

  /*
  |--------------------------------------------------------------------------
  | Entry
  |--------------------------------------------------------------------------
  */

  entry:
    "./src/main.tsx",

  /*
  |--------------------------------------------------------------------------
  | Output
  |--------------------------------------------------------------------------
  */

  output: {
    path: path.resolve(
      __dirname,
      "dist"
    ),

    filename:
      "bundle.js",

    clean: true
  },

  /*
  |--------------------------------------------------------------------------
  | Resolve
  |--------------------------------------------------------------------------
  */

  resolve: {
    extensions: [
      ".ts",
      ".tsx",
      ".js"
    ]
  },

  /*
  |--------------------------------------------------------------------------
  | Loaders
  |--------------------------------------------------------------------------
  */

  module: {
    rules: [

      /*
      --------------------------------------------
      TypeScript / JavaScript
      --------------------------------------------
      */

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

      /*
      --------------------------------------------
      CSS (for react-toastify etc)
      --------------------------------------------
      */

      {
        test: /\.css$/,

        use: [
          "style-loader",
          "css-loader"
        ]
      },

      /*
      --------------------------------------------
      SCSS MODULES
      Example:
      Home.module.scss
      --------------------------------------------
      */

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

      /*
      --------------------------------------------
      Normal SCSS
      Example:
      main.scss
      --------------------------------------------
      */

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

      /*
      --------------------------------------------
      Images
      --------------------------------------------
      */

      {
        test:
          /\.(png|jpg|jpeg|svg|webp)$/,

        type:
          "asset/resource"
      }
    ]
  },

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  */

  plugins: [
    new HtmlWebpackPlugin({
      template:
        "./public/index.html"
    })
  ],

  /*
  |--------------------------------------------------------------------------
  | Dev Server
  |--------------------------------------------------------------------------
  */

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