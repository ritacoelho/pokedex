import HtmlWebPackPlugin from "html-webpack-plugin";
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html"
});
export const mode = 'development';
export const module = {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader"
        }
    },
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    }
    ]
};
export const plugins = [htmlPlugin];