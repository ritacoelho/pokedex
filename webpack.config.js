const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html",
 favicon: "./src/favicon.ico"
});
module.exports = {
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
          use: [{
            loader: 'url-loader?limit=100000',
            options: {
              esModule: false
              } 
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/i,
          use: [{
            loader: 'file-loader?name=[name].[ext]',
            /* options: {
              outputPath: 'images/',
              name: '[name].[ext]',
              esModule: false
              }  */
            }
          ]
        }
      ]
    },
    plugins: [htmlPlugin]
  };