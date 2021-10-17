var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./public/index.html",
 filename: "./index.html",
 favicon: "./public/favicon.ico"
});
module.exports = {
  devServer: {
    static: {directory: path.join(__dirname, 'public')},
    compress: true,
    port: 8080
  },
  mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
          use: ['url-loader?limit=100000']
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          use: ['file-loader?name=[name].[ext]']
        }
      ]
    },
    plugins: [htmlPlugin]
  };