const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, args) => {
  const isProduction = args.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.[contenthash].js",
      publicPath: "/",
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    devServer: {
      historyApiFallback: true,
      static: path.resolve(__dirname, "./dist"),
      open: true,
      compress: true,
      hot: true,
      port: 8080,
    },
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  };
};
